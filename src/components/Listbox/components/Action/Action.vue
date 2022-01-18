<template lang="pug">
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import type { IconSource } from 'types/type';
// import styles from '@/classes/Action.json';
import { Icon } from '../../../Icon';
import { Option, OptionProps } from '../Option';
import { TextOption } from '../TextOption';

@Component
export default class Action extends Vue {
  @Prop({ type: [String, Object, Function], required: true })
  public source!: IconSource;

  @Prop({ type: Boolean })
  public selected!: boolean;

  @Prop({ type: Boolean })
  public disabled!: boolean;

  @Prop({ type: Boolean })
  public divider!: boolean;

  // get className(): string {
  //   return classNames(
  //     styles.Action,
  //     this.divider && styles.ActionDivider,
  //   );
  // }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Action/Action.scss';
</style>
