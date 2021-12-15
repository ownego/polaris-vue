<template lang="pug">
Choice(
  :id="id",
  :labelHidden="labelHidden",
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
      type="radio",
      :checked="checked",
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
import { Component, Prop, Emit } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/RadioButton.json';
import { Choice } from '../Choice';
import { helpTextID } from '../Choice/Choice.vue';

@Component({
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

  public mouseOver = false;

  public wrapperClassName: string = styles.RadioButton;

  public inputClassName: string = styles.Input;

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
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/RadioButton/RadioButton.scss';
</style>
