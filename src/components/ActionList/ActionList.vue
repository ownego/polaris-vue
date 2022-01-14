<template lang="pug">
// TODO: Update docs
components(
  :is="element",
  ref="actionList",
  :class="className",
  :tabIndex="elementTabIndex",
)
  template(v-for="section, index in finalSections")
    Section(
      v-if="section.items.length > 0",
      :key="section.title || index",
      :firstSection="index === 0",
      :section="section",
      :hasMultipleSections="hasMultipleSections",
      :actionRole="actionRole",
      @action-any-item="$emit('action-any-item')",
    )
      template(v-for="{prefixId, suffixId} in section.items")
        slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
        slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
  template(v-if="actionRole === 'menuitem'")
    KeypressListener(
      keyEvent="keydown",
      :keyCode="arrowDownKey",
      :handler="handleFocusNextItem",
    )
    KeypressListener(
      keyEvent="keydown",
      :keyCode="arrowUpKey",
      :handler="handleFocusPreviousItem",
    )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { ActionListItemDescriptor, ActionListSection } from './utils';
import styles from '@/classes/ActionList.json';
import { KeypressListener, Key } from '@/components/KeypressListener';
import { Section } from './components/Section';
import {
  wrapFocusPreviousFocusableMenuItem,
  wrapFocusNextFocusableMenuItem,
} from '@/utilities/focus';

@Component({
  components: {
    KeypressListener,
    Section,
  },
})
export default class ActionList extends Vue {
  /**
   * Collection of actions for list
   */
  @Prop({ type: Array })
  public items!: readonly ActionListItemDescriptor[];

  /**
   * Collection of sectioned action items
   */
  @Prop({ type: Array, default: () => [] })
  public sections!: readonly ActionListSection[];

  /**
   * Defines a specific role attribute for each action in the list
   */
  @Prop({ type: String })
  public actionRole!: 'menuitem' | string;

  @Ref('actionList') actionListNode!: HTMLElement;

  get finalSections(): readonly ActionListSection[] {
    if (this.items) {
      return [{ items: this.items }, ...this.sections];
    }

    if (this.sections) {
      return this.sections;
    }

    return [];
  }

  get hasMultipleSections(): boolean {
    return this.finalSections.length > 1;
  }

  get element(): string {
    return this.hasMultipleSections ? 'ul' : 'div';
  }

  get elementRole(): string | undefined {
    return this.hasMultipleSections && this.actionRole === 'menuitem' ? 'menu' : undefined;
  }

  get elementTabIndex(): number | undefined {
    return this.hasMultipleSections && this.actionRole === 'menuitem' ? -1 : undefined;
  }

  public className = classNames(styles.ActionList);

  public arrowDownKey = Key.ArrowDown;

  public arrowUpKey = Key.ArrowUp;

  public handleFocusPreviousItem(evt: KeyboardEvent) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    if (this.actionListNode && target) {
      if (this.actionListNode.contains(target)) {
        wrapFocusPreviousFocusableMenuItem(this.actionListNode, target);
      }
    }
  }

  public handleFocusNextItem(evt: KeyboardEvent) {
    evt.preventDefault();
    const target = evt.target as HTMLElement;
    if (this.actionListNode && target) {
      if (this.actionListNode.contains(target)) {
        wrapFocusNextFocusableMenuItem(this.actionListNode, target);
      }
    }
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/ActionList/ActionList.scss';
</style>
