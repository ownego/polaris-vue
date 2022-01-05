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
import { labelID, LabelProps } from './utils';
import styles from '@/classes/Label.json';

@Component
export default class Label extends Vue {
  @Prop({ type: String, required: true })
  public id!: LabelProps['id'];

  @Prop({ type: Boolean })
  public hidden?: LabelProps['hidden'];

  @Prop({ type: Boolean })
  public requiredIndicator?: LabelProps['requiredIndicator'];

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
