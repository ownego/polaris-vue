<template lang="pug">
a(
  :id="id",
  ref="anchorNode",
)
</template>

<script lang="ts">
import {
  Component,
  Inject,
  Mixins,
  Ref,
} from 'vue-property-decorator';
import { UseUniqueId } from '@/mixins';

type ScrollToPositionFn = (scrollY: number) => void;

@Component
export default class ScrollTo extends Mixins(UseUniqueId) {
  @Inject({ default: Function }) scrollToPosition!: ScrollToPositionFn;

  @Ref('anchorNode') anchorNode!: HTMLAnchorElement;

  public id = this.useUniqueId('ScrollTo');

  mounted(): void {
    if (!this.anchorNode) return;
    this.scrollToPosition(this.anchorNode.offsetTop);
  }
}
</script>
