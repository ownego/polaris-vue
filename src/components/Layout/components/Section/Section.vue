<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Layout.json';

@Component
export default class Section extends Vue {
  @Prop({ type: Boolean })
  public secondary?: boolean;

  @Prop({ type: Boolean })
  public fullWidth?: boolean;

  @Prop({ type: Boolean })
  public oneHalf?: boolean;

  @Prop({ type: Boolean })
  public oneThird?: boolean;

  get className(): string {
    return classNames(
      styles.Section,
      this.secondary && styles['Section-secondary'],
      this.fullWidth && styles['Section-fullWidth'],
      this.oneHalf && styles['Section-oneHalf'],
      this.oneThird && styles['Section-oneThird'],
    );
  }
}
</script>
