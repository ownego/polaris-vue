<template lang="pug">
Choice(
  :id="id",
  :labelHidden="labelHidden",
  :error="error",
  :disabled="disabled",
  @mouseover.native="mouseOver = true",
  @mouseout.native="mouseOver = false",
)
  template(slot="label")
    slot(name="label")
  template(slot="helpText")
    slot(name="helpText")
  span(:class="wrapperClassName")
    input(
      :id="id",
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
import Vue, { VueConstructor } from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { useUniqueId } from 'polaris-react/src/utilities/unique-id';
import MinusMinor from '@shopify/polaris-icons/dist/svg/MinusMinor.svg';
import TickSmallMinor from '@shopify/polaris-icons/dist/svg/TickSmallMinor.svg';
import styles from '@/classes/Checkbox.json';
import { Error } from '@/type';
import { errorTextID } from '../InlineError/InlineError.vue';
import { Choice } from '../Choice';
import { helpTextID } from '../Choice/Choice.vue';
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
   * Indicates the ID of the element that describes the checkbox
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
   * Disable input
   */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  /**
   * ID for form input
   */
  @Prop({ type: String, required: true })
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
   * Display an error message
   */
  @Prop({ type: [String, Boolean, Object] })
  public error!: Error | boolean;

  public mouseOver = false;

  get uniqueID(): string {
    return useUniqueId('Checkbox', this.id);
  }

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

  get isIndeterminate(): boolean {
    return this.checked === 'indeterminate';
  }

  get isChecked(): boolean {
    return !this.isIndeterminate && Boolean(this.checked);
  }

  get iconSource(): VueConstructor<Vue> {
    return this.isIndeterminate ? MinusMinor : TickSmallMinor;
  }

  get formattedAriaDescribedBy(): string | undefined {
    const describedBy: string[] = [];

    if (this.ariaDescribedBy) {
      describedBy.push(this.ariaDescribedBy);
    }

    if (this.error && typeof this.error !== 'boolean') {
      describedBy.push(errorTextID(this.id));
    }

    if (this.$slots.helpText) {
      describedBy.push(helpTextID(this.id));
    }

    return describedBy.length
      ? describedBy.join(' ')
      : undefined;
  }

  @Emit('change')
  // eslint-disable-next-line class-methods-use-this
  onChange(event: InputEvent): object {
    const target = event.target as HTMLInputElement;
    return { checked: target.checked, id: this.id };
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
