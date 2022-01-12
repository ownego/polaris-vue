<template lang="pug">
Choice(
  :id="uniqueId",
  :labelHidden="labelHidden",
  :error="error",
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
      type="checkbox",
      :checked="isChecked",
      :disabled="disabled",
      :class="inputClassName",
      :aria-invalid="error !== null",
      :aria-controls="ariaControl",
      :aria-describedby="formattedAriaDescribedBy",
      @change="onChange",
      @focus="$emit('focus')",
      @blur="$emit('blur')",
    )
    span(
      :class="backdropClassName",
      @click="stopPropagation",
    )
    span(:class="checkboxIconClassName")
      Icon(:source="iconSource")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import MinusMinor from '@shopify/polaris-icons/dist/svg/MinusMinor.svg';
import TickSmallMinor from '@shopify/polaris-icons/dist/svg/TickSmallMinor.svg';
import type { IconSource, Error } from 'types/type';
import styles from '@/classes/Checkbox.json';
import { useUniqueId } from '@/utilities/unique-id';
import { errorTextID } from '../InlineError';
import { Choice, helpTextID } from '../Choice';
import { Icon } from '../Icon';

@Component({
  components: {
    Choice,
    Icon,
  },
})
export default class Checkbox extends Vue {
  /**
   * Indicates the ID of the element that is controlled by the checkbox
   */
  @Prop({ type: String })
  public ariaControl!: string;

  /**
   * Indicates the ID of the element that is controlled by the checkbox
   */
  @Prop({ type: String })
  public ariaDescribedBy!: string;

  /**
   * Visually hide the label
   */
  @Prop({ type: Boolean })
  public labelHidden!: boolean;

  /**
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   */
  @Prop({ type: [Boolean, String] })
  public checked!: boolean | 'indeterminate';

  /**
   * ID for form input
   */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  /**
   * Name for form input
   */
  @Prop({ type: String })
  public id!: string;

  /**
   * Value for form input
   */
  @Prop({ type: String })
  public name!: string;

  /**
   * Value for form input
   */
  @Prop({ type: [String, Boolean] })
  public value!: string | boolean;

  /**
   * Display an error message
   */
  @Prop({ type: [String, Boolean, Array, Object, Function] })
  public error!: Error | boolean;

  public mouseOver = false;

  get wrapperClassName(): string {
    return classNames(styles.Checkbox, this.error && styles.error);
  }

  get inputClassName(): string {
    return classNames(
      styles.Input,
      this.isIndeterminate && styles['Input-indeterminate'],
    );
  }

  get backdropClassName(): string {
    return classNames(
      styles.Backdrop,
      this.mouseOver && styles.hover,
    );
  }

  public checkboxIconClassName: string = styles.Icon;

  get uniqueId(): string {
    return useUniqueId('Checkbox', this.id);
  }

  get isIndeterminate(): boolean {
    return this.checked === 'indeterminate';
  }

  get isChecked(): boolean {
    return (!this.isIndeterminate && Boolean(this.checked))
      || (typeof this.value === 'boolean' && this.value === true);
  }

  get iconSource(): IconSource {
    return this.isIndeterminate ? MinusMinor : TickSmallMinor;
  }

  get formattedAriaDescribedBy(): string | undefined {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy) {
      describedBy.push(this.ariaDescribedBy);
    }

    if (this.error && typeof this.error !== 'boolean') {
      describedBy.push(errorTextID(this.uniqueId));
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

    this.$emit('input', target.checked);
    this.$emit('change', event);
  }

  // eslint-disable-next-line class-methods-use-this
  public stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Checkbox/Checkbox.scss';
</style>
