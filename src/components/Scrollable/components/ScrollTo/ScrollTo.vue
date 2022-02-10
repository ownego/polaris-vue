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
  Watch,
} from 'vue-property-decorator';
import { UseUniqueId } from '@/mixins';

type ScrollToPositionFn = (scrollY: number) => void;

@Component
export default class ScrollTo extends Mixins(UseUniqueId) {
  @Inject({ default: Function }) 'scrollToPositionContext'!: ScrollToPositionFn;

  @Ref('anchorNode') anchorNode!: HTMLAnchorElement;

  @Watch('scrollToPosition')
  onScrollToPosition() {
    if (!this.scrollToPositionContext || !this.anchorNode) return;
    this.scrollToPositionContext(this.anchorNode.offsetTop);
  }

  public id = this.useUniqueId('ScrollTo');
}
</script>
