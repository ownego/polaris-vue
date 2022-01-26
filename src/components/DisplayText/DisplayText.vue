<template lang="pug">
component(
  :is="element",
  :class="className",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { HeadingTagName } from 'polaris-react/src/types';
import styles from '@/classes/DisplayText.json';

@Component
export default class DisplayText extends Vue {
  /**
   * Name of element to use for text
   * @default 'p'
   */
  @Prop({ type: String, default: 'p' })
  public element?: HeadingTagName;

  /**
   * Size of the text
   * @default 'medium'
   */
  @Prop({ type: String, default: 'medium' })
  public size!: 'small' | 'medium' | 'large' | 'extraLarge';

  get className() {
    return classNames(
      styles.DisplayText,
      this.size && styles[variationName('size', this.size) as keyof typeof styles],
    );
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/DisplayText/DisplayText.scss';
</style>
