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
  template(slot="helpText")
    slot(name="helpText")
  span(:class="wrapperClassName")
    input(
      :id="uniqueId",
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
import { RadioButtonProps } from './utils';
import { useUniqueId } from '@/utilities/unique-id';
import { helpTextID } from '../Choice/Choice.vue';
import { Choice } from '../Choice';

@Component({
  components: {
    Choice,
  },
})
export default class RadioButton extends Vue {
  @Prop({ type: String })
  public ariaDescribedBy!: RadioButtonProps['ariaDescribedBy'];

  @Prop({ type: Boolean })
  public labelHidden!: RadioButtonProps['labelHidden'];

  @Prop({ type: Boolean })
  public checked!: RadioButtonProps['checked'];

  @Prop({ type: Boolean })
  public disabled!: RadioButtonProps['disabled'];

  @Prop({ type: String })
  public id!: RadioButtonProps['id'];

  @Prop({ type: String })
  public name!: RadioButtonProps['name'];

  @Prop({ type: String })
  public value!: RadioButtonProps['value'];

  public mouseOver = false;

  public wrapperClassName: string = styles.RadioButton;

  public inputClassName: string = styles.Input;

  get uniqueId(): string {
    return useUniqueId('RadioButton', this.id);
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

  @Emit('change')
  // eslint-disable-next-line class-methods-use-this
  onChange(event: InputEvent): object {
    return event;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/RadioButton/RadioButton.scss';
</style>
