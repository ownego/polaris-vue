<template lang="pug">
// TODO: Update docs
div(ref="container")
  slot(name="activator")
  Portal(v-if="activatorNode && active", :to="portalId")
    div(:data-portal-id="portalId")
      PopoverOverlay(
        :activator="activatorNode",
        :fullWidth="fullWidth",
        :active="active",
        :preferInputActivator="preferInputActivator",
        :fixed="fixed",
        :preferredPosition="preferredPosition",
        :preferredAlignment="preferredAlignment",
        :zIndexOverride="zIndexOverride",
        :autofocusTarget="autofocusTarget",
        @close="handleClose",
        @scrolled-to-bottom="$emit('scrolled-to-bottom')",
      )
        template(v-slot:overlay="props")
          slot(name="content")
  PortalTarget(:name="portalId")
</template>

<script lang="ts">
import Vue from 'vue';
import { Portal, PortalTarget } from 'portal-vue';
import {
  Component, Prop, Watch, Ref,
} from 'vue-property-decorator';
import {
  findFirstFocusableNodeIncludingDisabled,
  focusNextFocusableNode,
} from '@/utilities/focus';
import { useUniqueId } from '@/utilities/unique-id';
import type { PreferredAlignment, PreferredPosition } from '../PositionedOverlay';
import { PopoverCloseSource, PopoverAutofocusTarget, setActivatorAttributes } from './utils';
import { PopoverOverlay } from './components';

@Component({
  components: {
    PopoverOverlay,
    Portal,
    PortalTarget,
  },
})
export default class Popover extends Vue {
  /**
   * The preferred direction to open the popover
   * @values above | below | mostSpace
   */
  @Prop()
  public preferredPosition?: PreferredPosition;

  /**
   * The preferred alignment of the popover relative to its activator
   * @values left | center | right
   */
  @Prop()
  public preferredAlignment?: PreferredAlignment;

  /**
   * Show or hide the Popover
   */
  @Prop({ type: Boolean, required: true })
  public active!: boolean;

  /**
   * Use the activator's input element to calculate the Popover position
   * @default true
   */
  @Prop({ type: Boolean, default: true })
  public preferInputActivator?: boolean;

  /**
   * Override on the default z-index of 400
   */
  @Prop({ type: Number })
  public zIndexOverride?: number;

  /**
   * Prevents focusing the activator or the next focusable element when the popover is deactivated
   */
  @Prop({ type: Boolean })
  public preventFocusOnClose?: boolean;

  /**
   * Automatically add wrap content in a section
   */
  @Prop({ type: Boolean })
  public sectioned?: boolean;

  /**
   * Allow popover to stretch to the full width of its activator
   */
  @Prop({ type: Boolean })
  public fullWidth?: boolean;

  /**
   * Allow popover to stretch to fit content vertically
   */
  @Prop({ type: Boolean })
  public fullHeight?: boolean;

  /**
   * Allow popover content to determine the overlay width and height
   */
  @Prop({ type: Boolean })
  public fluidContent?: boolean;

  /**
   * Remains in a fixed position
   */
  @Prop({ type: Boolean })
  public fixed?: boolean;

  /**
  /** Used to illustrate the type of popover element
   */
  @Prop({ type: String })
  public ariaHaspopup!: string;

  /**
   * Allow the popover overlay to be hidden when printing
   */
  @Prop({ type: Boolean })
  public hideOnPrint?: boolean;

  /**
   * The preferred auto focus target defaulting to the popover container
   * @default 'container'
   */
  @Prop({ type: String, default: 'container' })
  public autofocusTarget?: PopoverAutofocusTarget;

  @Watch('active')
  onActiveChanged() {
    this.setAccessibilityAttributes();
  }

  @Ref('container') containerNode!: HTMLElement;

  public isInPortal = (element: Element) => {
    let { parentElement } = element;

    while (parentElement) {
      if (parentElement.matches('.vue-portal-target')) return false;
      parentElement = parentElement.parentElement;
    }

    return true;
  }

  public handleClose(source: PopoverCloseSource) {
    this.$emit('close', source);
    if (!this.containerNode || this.preventFocusOnClose) return;

    if ((source === PopoverCloseSource.FocusOut || source === PopoverCloseSource.EscapeKeypress)
      && this.activatorNode
    ) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(
        this.activatorNode as HTMLElement,
      )
        || findFirstFocusableNodeIncludingDisabled(this.containerNode)
        || this.containerNode;
      if (!focusNextFocusableNode(focusableActivator, this.isInPortal)) {
        focusableActivator.focus();
      }
    }
  }

  public activatorNode: HTMLElement | Element | null = null;

  public id = useUniqueId('popover');

  public portalId = `popover-${useUniqueId('portal')}`;

  public setAccessibilityAttributes() {
    if (!this.containerNode) {
      return;
    }

    const firstFocusable = findFirstFocusableNodeIncludingDisabled(this.containerNode);
    const focusableActivator: HTMLElement & { disabled?: boolean; } = firstFocusable
      || this.containerNode;
    const activatorDisabled = 'disabled' in focusableActivator && Boolean(focusableActivator.disabled);

    setActivatorAttributes(focusableActivator, {
      id: this.id,
      active: this.active,
      ariaHaspopup: this.ariaHaspopup,
      activatorDisabled,
    });
  }

  mounted(): void {
    if (this.containerNode) {
      const activatorNode = this.containerNode.firstElementChild;
      if (activatorNode) this.activatorNode = activatorNode;
      this.setAccessibilityAttributes();
    }
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Popover/Popover.scss';
</style>
