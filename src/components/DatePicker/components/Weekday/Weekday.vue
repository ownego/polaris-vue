<template lang="pug">
th(
  :aria-label="label",
  scope="col",
  :class="className",
) {{ title }}
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/DatePicker.json';
import { classNames } from 'polaris-react/src/utilities/css';

@Component
export default class Weekday extends Vue {
  @Prop({ type: String })
  public label!: string;

  @Prop({ type: String })
  public title!: string;

  @Prop({ type: Boolean })
  public current!: boolean;

  get className() {
    return classNames(
      styles.Weekday,
      this.current && styles['Weekday-current'],
    );
  }
}
</script>
