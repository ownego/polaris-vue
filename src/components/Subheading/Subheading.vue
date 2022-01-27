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
import { classNames } from 'polaris-react/src/utilities/css';
import type { HeadingTagName } from 'polaris-react/src/types';
import styles from '@/classes/Subheading.json';

@Component
export default class Subheading extends Vue {
  /**
   * The element name to use for the subheading
   * @default 'h3'
   */
  @Prop({ type: String, default: 'h3' })
  public element?: HeadingTagName;;

  public className = classNames(styles.Subheading);
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Subheading/Subheading.scss';
</style>
