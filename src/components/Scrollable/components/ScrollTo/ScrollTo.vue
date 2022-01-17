<template lang="pug">
a(
  :id="id",
  ref="anchorNode",
)
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Inject,
  Ref,
  Watch,
} from 'vue-property-decorator';
import { useUniqueId } from '@/utilities/unique-id';

type ScrollToPositionFn = (scrollY: number) => void;

@Component
export default class ScrollTo extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Inject({ default: (scrollY: number) => {} }) 'scrollToPositionContext': ScrollToPositionFn;

  @Ref('anchorNode') anchorNode!: HTMLAnchorElement;

  @Watch('scrollToPosition')
  onScrollToPosition() {
    if (!this.anchorNode) return;

    this.scrollToPositionContext(this.anchorNode.offsetTop);
  }

  public id = useUniqueId('ScrollTo');
}
</script>
