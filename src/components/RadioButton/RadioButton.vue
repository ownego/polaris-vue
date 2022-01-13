<template lang="pug">
Choice(
  :id="uniqueId",
  :labelHidden="labelHidden",
  :disabled="disabled",
  @mouseover.native="mouseOver = true",
  @mouseout.native="mouseOver = false",
)
  template(slot="label")
    slot(name="label")
  template(slot="help-text")
    slot(name="help-text")
  span(:class="wrapperClassName")
    input(
      :id="uniqueId",
      :name="name",
      :value="value",
      type="radio",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-describedby="formattedAriaDescribedBy",
      @change="onChange",
      @focus="$emit('focus')",
      @blur="$emit('blur')",
    )
    span(:class="backdropClassName")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/RadioButton.json';
import { useUniqueId } from '@/utilities/unique-id';
import { Choice, helpTextID } from '../Choice';

@Component({
  model: {
    prop: 'modelValue',
    event: 'input',
  },

  components: {
    Choice,
  },
})
export default class RadioButton extends Vue {
  /**
   * Indicates the ID of the element that describes the the radio button
   */
  @Prop({ type: String })
  public ariaDescribedBy!: string;

  /**
   * Visually hide the label
   */
  @Prop({ type: Boolean })
  public labelHidden!: boolean;

  /**
   * Radio button is selected
   */
  @Prop({ type: Boolean })
  public checked!: boolean;

  /**
   * Disable input
   */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  /**
   * ID for form input
   */
  @Prop({ type: String })
  public id!: string;

  /**
   * Name for form input
   */
  @Prop({ type: String })
  public name!: string;

  /**
   * Value for form input
   */
  @Prop({ type: String })
  public value!: string;

  /**
   * Model value using for v-model
   */
  @Prop({ type: String })
  public modelValue!: string;

  public mouseOver = false;

  public wrapperClassName: string = styles.RadioButton;

  public inputClassName: string = styles.Input;

  get uniqueId(): string {
    return useUniqueId('RadioButton', this.id);
  }

  get isChecked(): boolean {
    return this.checked || this.modelValue === this.value;
  }

  get backdropClassName(): string {
    return classNames(
      styles.Backdrop,
      this.mouseOver && styles.hover,
    );
  }

  get formattedAriaDescribedBy(): string | undefined {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy) {
      describedBy.push(this.ariaDescribedBy);
    }

    if (this.$slots.helpText) {
      describedBy.push(helpTextID(this.uniqueId));
    }

    return describedBy.length
      ? describedBy.join(' ')
      : undefined;
  }

  onChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    this.$emit('input', target.value);
    this.$emit('change', event);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/RadioButton/RadioButton.scss';
</style>
