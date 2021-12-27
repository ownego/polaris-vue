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
import styles from '@/classes/List.json';

type Type = 'bullet' | 'number';

@Component
export default class List extends Vue {
  /**
   * Type of list to display
   * @values bullet | number
   */
  @Prop({ type: String, default: 'bullet' })
  public type!: Type;

  get className() {
    const variation = variationName('type', this.type) as keyof typeof styles;

    return classNames(
      styles.List,
      this.type && styles[variation],
    );
  }

  public element = this.type === 'bullet' ? 'ul' : 'ol';
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/List/List.scss';
</style>
