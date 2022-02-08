<template lang="pug">
div(ref="focusTrapWrapper")
  Focus(:disabled="disableFocus", :root="wrapperNode")
  EventListener(event="focusin", :handler="handleFocusIn")
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import { portal } from 'polaris-react/src/components/shared';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { Focus } from '@/components/Focus';
import { EventListener } from '@/components/EventListener';

@Component({
  components: {
    Focus,
    EventListener,
  },
})
export default class TrapFocus extends Vue {
  @Prop({ type: Boolean, default: true }) public trapping!: boolean;

  @Ref('focusTrapWrapper') wrapperNode!: HTMLElement;

  public disableFocus = true;
}

</script>
