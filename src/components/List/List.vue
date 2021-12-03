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
import style from '@/classes/List.json';

type Type = 'bullet' | 'number';

/**
 * <br/>
 * <h4 class="desc">
 * Lists display a set of related text-only content.
 * Each list item begins with a bullet or a number.
 * </h4>
 */
@Component
export default class List extends Vue {
  /**
   * Type of list to display
   * @values bullet | number
   */
  @Prop({ type: String, default: 'bullet' })
  public type!: Type;

  get className() {
    const variation = variationName('type', this.type) as keyof typeof style;

    return classNames(
      style.List,
      this.type && style[variation],
    );
  }

  public element = this.type === 'bullet' ? 'ul' : 'ol';
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/List/List.scss';
</style>
