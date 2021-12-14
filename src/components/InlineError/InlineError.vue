<template lang="pug">
div(:id="wrapperID", :class="wrapperClassName")
  div(:class="iconClassName")
    Icon(:source="icon")
  component(
    v-if="typeof message === 'object'",
    :is="message",
  )
  div(v-else) {{ message }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AlertMinor from '@shopify/polaris-icons/dist/svg/AlertMinor.svg';
import styles from '@/classes/InlineError.json';
import { IconSource, Error } from '@/type';
import { Icon } from '../Icon';

export const errorTextID = (id: string): string => `${id}Error`;

@Component({
  components: {
    Icon,
  },
})
export default class InlineError extends Vue {
  /**
   * Content briefly explaining how to resolve the invalid form field input.
   */
  @Prop({ type: [String, Object], required: true })
  public message!: Error;

  /**
   * Unique identifier of the invalid form field that the message describes
   */
  @Prop({ type: String, required: true })
  public fieldID!: string;

  public icon: IconSource = AlertMinor;

  public wrapperClassName: string = styles.InlineError;

  public iconClassName: string = styles.Icon;

  get wrapperID(): string {
    return errorTextID(this.fieldID);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/InlineError/InlineError.scss';
</style>
