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
import { classNames, variationName } from '../../utilities/css';

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

  public element = this.type === 'bullet' ? 'ul' : 'ol';

  protected get className(): string {
    const name = classNames(
      this.$style.ListOption,
      this.type && this.$style[variationName('type', this.type)],
    );
    console.log(this.$style, name);
    return classNames(
      this.$style.ListOption,
      this.type && this.$style[variationName('type', this.type)],
    );
  }
}
</script>

<style lang="scss" module>
@import './ListOption.scss';
</style>
