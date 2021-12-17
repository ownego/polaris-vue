<template lang="pug">
div
  label(:class="wrapperClassName", :for="id")
    span(:class="controlClass")
      slot
    span(:class="labelClass")
      slot(name="label")
        | &nbsp;
  div(
    v-if="error || $slots.helpText",
    :class="descriptionMarkupClass",
  )
    div(
      v-if="$slots.helpText",
      :id="helpTextID",
      :class="helpTextClass",
    )
      slot(name="helpText")
    InlineError(
      v-if="(error && typeof error !== 'boolean')",
      :fieldID="id",
      :message="error",
    )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Choice.json';
import type { Error } from '@/type';
import { InlineError } from '../InlineError';

export const helpTextID = (id: string): string => `${id}HelpText`;

@Component({
  components: {
    InlineError,
  },
})
export default class Choice extends Vue {
  /**
   * A unique identifier for the choice
   */
  @Prop({ type: String, required: true })
  public id!: string;

  /**
   * Label for the choice
   */
  @Prop({ type: String })
  public label!: string;

  /**
   * Whether the associated form control is disabled
   */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  /**
   * Display an error message
   */
  @Prop({ type: [String, Array, Object, Function, Boolean] })
  public error!: Error | boolean;

  /**
   * Visually hide the label
   */
  @Prop({ type: Boolean })
  public labelHidden!: boolean;

  public controlClass: string = styles.Control;

  public labelClass: string = styles.Label;

  public descriptionMarkupClass: string = styles.Descriptions;

  public helpTextClass: string = styles.HelpText;

  get wrapperClassName(): string {
    return classNames(
      styles.Choice,
      this.labelHidden && styles.labelHidden,
      this.disabled && styles.disabled,
    );
  }

  get helpTextID(): string {
    return helpTextID(this.id);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Choice/Choice.scss';
</style>
