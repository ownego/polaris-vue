<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Stack.json';

@Component
export default class Item extends Vue {
  /**
   * Fill the remaining horizontal space in the stack with the item
   */
  @Prop({ type: Boolean, default: false })
  public fill!: boolean;

  public className = classNames(styles.Item, this.fill && styles['Item-fill']);
}
</script>
