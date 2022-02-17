<template lang="pug">
div(v-if="error && typeof error !== 'boolean' || $slots['help-text']")
  label(
    :class="wrapperClassName",
    @click="$emit('click')",
    @mouseover="$emit('mouseover')",
    @mouseout="$emit('mouseout')",
  )
    span(:class="controlClass")
      slot
    span(:class="labelClass")
      slot(name="label")
  div(:class="descriptionMarkupClass")
    div(
      v-if="$slots['help-text']",
      :id="helpTextID",
      :class="helpTextClass",
    )
      slot(name="help-text")
    InlineError(
      v-if="(error && typeof error !== 'boolean')",
      :fieldID="id",
      :message="error",
    )
label(
  v-else
  :class="wrapperClassName",
  @click="$emit('click')",
  @mouseover="$emit('mouseover')",
  @mouseout="$emit('mouseout')",
)
  span(:class="controlClass")
    slot
  span(:class="labelClass")
    slot(name="label")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import type { Error } from 'types/type';
import styles from '@/classes/Choice.json';
import { helpTextID } from './utils';
import { InlineError } from '../InlineError';

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
   * Whether the associated form control is disabled
   */
  @Prop({ type: Boolean })
  public disabled?: boolean;

  /**
   * Display an error message
   */
  @Prop({ type: [String, Array, Object, Function, Boolean] })
  public error?: Error | boolean;

  /**
   * Visually hide the label
   */
  @Prop({ type: Boolean })
  public labelHidden?: boolean;

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
