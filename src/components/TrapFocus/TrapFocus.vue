<template lang="pug">
div(ref="focusTrapWrapper")
  Focus(:disabled="disableFocus", :root="wrapperNode")
  EventListener(event="focusin", :handler="handleFocusIn")
  KeypressListener(:keyCode="tabKey", keyEvent="keydown", :handler="handleTab")
  slot
</template>
<script lang="ts">
import {
  Component, Ref, Mixins, Watch,
} from 'vue-property-decorator';
import { portal } from 'polaris-react/src/components/shared';
import {
  focusFirstFocusableNode,
  findFirstKeyboardFocusableNode,
  findLastKeyboardFocusableNode,
  focusFirstKeyboardFocusableNode,
  focusLastKeyboardFocusableNode,
} from '@/utilities/focus';
import { Focus } from '@/components/Focus';
import { EventListener } from '@/components/EventListener';
import { KeypressListener, Key } from '@/components/KeypressListener';
import { UseFocusManager } from '@/mixins';

@Component({
  components: {
    Focus,
    EventListener,
    KeypressListener,
  },
})
export default class TrapFocus extends Mixins(UseFocusManager) {
  @Ref('focusTrapWrapper') wrapperNode!: HTMLElement;

  @Watch('canSafelyFocus')
  @Watch('trapping')
  changeDisableFocus() {
    this.disableFocus = this.canSafelyFocus
      && !(this.wrapperNode && this.wrapperNode.contains(document.activeElement))
      ? !this.trapping
      : true;
  }

  public disableFocus = true;

  public tabKey = Key.Tab;

  public handleFocusIn(event: FocusEvent) {
    if (!this.trapping
      || !this.wrapperNode
      || this.wrapperNode.contains(document.activeElement)
      || (event.target instanceof Element && event.target.matches(`${portal.selector} *`))
    ) return;

    if (this.canSafelyFocus
      && event.target instanceof HTMLElement
      && this.wrapperNode !== event.target
      && this.wrapperNode.contains(event.target)
    ) {
      focusFirstFocusableNode(this.wrapperNode);
    }
  }

  public handleTab(event: KeyboardEvent) {
    if (!this.trapping || !this.wrapperNode) {
      return;
    }

    const firstFocusableNode = findFirstKeyboardFocusableNode(this.wrapperNode);
    const lastFocusableNode = findLastKeyboardFocusableNode(this.wrapperNode);

    if (event.target === lastFocusableNode && !event.shiftKey) {
      event.preventDefault();
      focusFirstKeyboardFocusableNode(this.wrapperNode);
    }

    if (event.target === firstFocusableNode && event.shiftKey) {
      event.preventDefault();
      focusLastKeyboardFocusableNode(this.wrapperNode);
    }
  }
}
</script>
