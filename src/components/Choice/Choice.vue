<template lang="pug">
div
  label(:class="wrapperClassName", :for="id")
    span(:class="childrenClass")
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
      :id="helpTextId",
      :class="helpTextClass",
    )
      slot(name="helpText")
    InlineError(
      v-if="error",
      :fieldId="id",
      :message="error",
    )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Choice.json';
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
  @Prop({ type: String })
  public error!: string;

  /**
   * Visually hide the label
   */
  @Prop({ type: Boolean })
  public labelHidden!: boolean;

  public childrenClass: string = styles.Control;

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

  get helpTextId(): string {
    return `${this.id}HelpText`;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Choice/Choice.scss';
</style>
