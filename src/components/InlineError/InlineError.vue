<template lang="pug">
div(:id="wrapperID", :class="wrapperClassName")
  div(:class="iconClassName")
    Icon(:source="iconAlertMinor")
  component(
    v-if="['object', 'function'].includes(typeof message)",
    :is="message",
  )
  div(v-else) {{ message }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import type { Error } from 'types/type';
import AlertMinor from '@icons/AlertMinor.svg';
import styles from '@/classes/InlineError.json';
import { errorTextID } from './utils';
import { Icon } from '../Icon';

@Component({
  components: {
    Icon,
  },
})
export default class InlineError extends Vue {
  /**
   * Content briefly explaining how to resolve the invalid form field input.
   */
  @Prop({ type: [String, Array, Object, Function], required: true })
  public message!: Error;

  /**
   * Unique identifier of the invalid form field that the message describes
   */
  @Prop({ type: String, required: true })
  public fieldID!: string;

  public wrapperClassName: string = styles.InlineError;

  public iconClassName: string = styles.Icon;

  public iconAlertMinor = AlertMinor;

  get wrapperID(): string {
    return errorTextID(this.fieldID);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/InlineError/InlineError.scss';
</style>
