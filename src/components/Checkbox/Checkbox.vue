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
  template(slot="helpText")
    slot(name="helpText")
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
import { Component, Prop, Emit } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import MinusMinor from '@shopify/polaris-icons/dist/svg/MinusMinor.svg';
import TickSmallMinor from '@shopify/polaris-icons/dist/svg/TickSmallMinor.svg';
import type { IconSource } from 'types/type';
import styles from '@/classes/Checkbox.json';
import { CheckboxProps } from './utils';
import { useUniqueId } from '@/utilities/unique-id';
import { errorTextID } from '../InlineError';
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
  @Prop({ type: String })
  public ariaControl!: CheckboxProps['ariaControl'];

  @Prop({ type: String })
  public ariaDescribedBy!: CheckboxProps['ariaDescribedBy'];

  @Prop({ type: Boolean })
  public labelHidden!: CheckboxProps['labelHidden'];

  @Prop({ type: [Boolean, String] })
  public checked!: CheckboxProps['checked'];

  @Prop({ type: Boolean })
  public disabled!: CheckboxProps['disabled'];

  @Prop({ type: String })
  public id!: CheckboxProps['id'];

  @Prop({ type: String })
  public name!: CheckboxProps['name'];

  @Prop({ type: [String, Boolean] })
  public value!: CheckboxProps['value'];

  @Prop({ type: [String, Boolean, Array, Object, Function] })
  public error!: CheckboxProps['error'];

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
    return !this.isIndeterminate && Boolean(this.checked);
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

  @Emit('change')
  // eslint-disable-next-line class-methods-use-this
  onChange(event: InputEvent): object {
    return event;
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
