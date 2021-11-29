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
import Styles from './Styles.vue';

type Type = 'bullet' | 'number';

/**
 * <br/>
 * <h4 class="desc">
 * Lists display a set of related text-only content.
 * Each list item begins with a bullet or a number.
 * </h4>
 */
@Component({
  mixins: [Styles],
})
export default class List extends Vue {
  /**
   * Type of list to display
   * @values bullet | number
   */
  @Prop({ type: String, default: 'bullet' })
  public type!: Type;

  public element = this.type === 'bullet' ? 'ul' : 'ol';

  protected get className(): string {
    console.log('aaa', this.$style);
    return classNames(
      this.$style.List,
      this.type && this.$style[variationName('type', this.type)],
    );
  }
}
</script>
