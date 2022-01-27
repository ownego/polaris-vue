<template lang="pug">
div(
  :class="className",
  @focus="forceTrueFocused",
  @blur="forceFalseFocused",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ButtonGroup.json';
import { anyKey } from '@/interface';

@Component
export default class Item extends Vue {
  public focused = false;

  public forceTrueFocused() {
    this.focused = true;
  }

  public forceFalseFocused() {
    this.focused = false;
  }

  get slotProps() {
    return this.$slots.default && this.$slots.default[0].componentOptions?.propsData as anyKey;
  }

  get className() {
    return classNames(
      styles.Item,
      this.focused && styles['Item-focused'],
      this.slotProps && this.slotProps.plain && styles['Item-plain'],
    );
  }
}
</script>
