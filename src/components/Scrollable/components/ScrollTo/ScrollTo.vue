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
} from 'vue-property-decorator';
import { useUniqueId } from '@/utilities/unique-id';

type ScrollToPositionFn = (scrollY: number) => void;

@Component
export default class ScrollTo extends Vue {
  @Inject({ default: Function }) scrollToPosition!: ScrollToPositionFn;

  @Ref('anchorNode') anchorNode!: HTMLAnchorElement;

  public id = useUniqueId('ScrollTo');

  mounted(): void {
    if (!this.anchorNode) return;
    this.scrollToPosition(this.anchorNode.offsetTop);
  }
}
</script>
