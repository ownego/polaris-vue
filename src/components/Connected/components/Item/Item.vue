<template lang="pug">
div(
  :className="className",
  @focus="onFocus",
  @blur="onBlur",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Connected.json';

type ItemPosition = 'left' | 'right' | 'primary';

@Component
export default class Item extends Vue {
  /**
   * Position of the item
   */
  @Prop({ type: String, required: true })
  public position!: ItemPosition;

  public focused!: boolean;

  get className(): string {
    return classNames(
      styles.Item,
      this.focused && styles['Item-focused'],
      this.position === 'primary' && styles['Item-primary'],
    );
  }

  public onFocus(): void {
    this.focused = true;
    this.$emit('focus');
  }

  public onBlur(): void {
    this.focused = false;
    this.$emit('blur');
  }
}
</script>
