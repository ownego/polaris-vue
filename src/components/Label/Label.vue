<template lang="pug">
div(:class="className")
  label(
    :id="labelID",
    :for="id",
    :class="labelClassName",
  )
    slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Label.json';

export interface LabelProps {
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

export function labelID(id: string) {
  return `${id}Label`;
}

@Component
export default class Label extends Vue {
  @Prop({ type: String, required: true })
  public id!: string;

  @Prop({ type: Boolean })
  public hidden?: boolean;

  @Prop({ type: Boolean })
  public requiredIndicator?: boolean;

  get className() {
    return classNames(
      styles.Label,
      this.hidden && styles.hidden,
    );
  }

  get labelClassName() {
    return classNames(
      styles.Text,
      this.requiredIndicator && styles.RequiredIndicator,
    );
  }

  get labelID() {
    return labelID(this.id);
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Label/Label.scss';
</style>
