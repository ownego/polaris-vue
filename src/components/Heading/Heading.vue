<template lang="pug">
component(:is="element" :class="className" :id="id")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/Heading.json';
import type { HeadingTagName } from 'polaris-react/src/types';

@Component
export default class Heading extends Vue {
  /**
   * The element name to use for the heading
   * @default 'h2'
   */
  @Prop({ type: String, default: 'h2' })
  public element?: HeadingTagName

  /**
   * A unique identifier for the heading,
   * used for reference in anchor links
   */
  @Prop({ type: String })
  public id?: string;

  public className = styles.Heading;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Heading/Heading.scss';
</style>
