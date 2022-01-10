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
import type { ScrollToPositionFn } from '../../utils';

@Component
export default class ScrollTo extends Vue {
  @Inject() 'scrollToPosition': ScrollToPositionFn;

  @Ref('anchorNode') anchorNode!: HTMLAnchorElement;

  @Watch('scrollToPosition')
  onScrollToPosition() {
    if (!this.scrollToPosition || !this.anchorNode) {
      return;
    }

    this.scrollToPosition(this.anchorNode.offsetTop);
  }

  public id = useUniqueId('ScrollTo');
}
</script>
