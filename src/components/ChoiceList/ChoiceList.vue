<template lang="pug">
fieldset(
  :id="finalName",
  :class="className",
  :aria-invalid="error !== null",
)
  legend(:class="titleClassName")
    slot
  ul(:class="listClassName")
    li(
      v-for="choice, index in choices",
      :key="index",
    )
      component(
        :is="allowMultiple ? 'Checkbox' : 'RadioButton'",
        :name="finalName",
        :value="choice.value",
        :checked="isChoiceSelected(choice)",
        :disabled="choice.disabled || disabled",
        :ariaDescribedBy="generateAriaDescribedBy(choice.describedByErrorField)",
        @change="onChange($event, choice)",
      )
        template(slot="label")
          span {{ choice.label }}
        template(slot="help-text")
          span {{ choice.helpText }}
      div(
        v-if="typeof choice.renderChildren === 'string'",
        v-html="choice.renderChildren",
        :class="childrenClassName",
      )
      component(
        v-else
        :is="choice.renderChildren",
        :class="childrenClassName",
      )
  div(
    v-if="error",
    :class="errorClassName",
  )
    InlineError(
      :fieldID="finalName",
      :message="error",
    )
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import type { Error } from 'types/type';
import styles from '@/classes/ChoiceList.json';
import { UseUniqueId } from '@/mixins';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { InlineError, errorTextID } from '../InlineError';

interface choiceProps {
  value: string,
  label: string,
  disabled?: boolean,
  helpText?: string,
  describedByErrorField?: boolean,
  renderChildren?: string | VueConstructor<Vue>,
}

@Component({
  components: {
    Checkbox,
    RadioButton,
    InlineError,
  },
})
export default class ChoiceList extends Mixins(UseUniqueId) {
  /**
   * Collection of choices
   */
  @Prop({ type: Array, required: true })
  public choices!: choiceProps[];

  /**
   * V-model will automatically bind to this prop
   */
  @Prop({ type: [String, Array], required: true })
  public value!: string | string[];

  /**
   * Name for form input
   */
  @Prop({ type: String })
  public name?: string;

  /**
   * Allow merchants to select multiple options at once
   */
  @Prop({ type: Boolean })
  public allowMultiple?: boolean;

  /**
   * Toggles display of the title
   */
  @Prop({ type: Boolean })
  public titleHidden?: boolean;

  /**
   * Display an error message
   */
  @Prop({ type: [String, Object, Function, Array] })
  public error?: Error;

  /**
   * Disable all choices
   */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  public titleClassName: string = styles.Title;

  public errorClassName: string = styles.ChoiceError;

  public listClassName: string = styles.Choices;

  public childrenClassName: string = styles.ChoiceChildren;

  get className(): string {
    return classNames(
      styles.ChoiceList,
      this.titleHidden && styles.titleHidden,
    );
  }

  get finalName(): string {
    const name = this.useUniqueId('ChoiceList', this.name);
    return this.allowMultiple ? `${this.name}Multiple` : name;
  }

  public generateAriaDescribedBy(describedByErrorField: boolean): string {
    return this.error && describedByErrorField
      ? errorTextID(this.finalName)
      : '';
  }

  protected isChoiceSelected(choice: choiceProps): boolean {
    return this.allowMultiple
      ? this.value.includes(choice.value as string)
      : choice.value === this.value;
  }

  public updateSelectedChoices(event: InputEvent): string | string[] {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      return this.allowMultiple
        ? [...this.value, target.value]
        : target.value;
    }

    return Array.isArray(this.value)
      ? this.value.filter((val) => val !== target.value)
      : [];
  }

  public onChange(event: InputEvent, choice: choiceProps): void {
    this.$emit('input', this.updateSelectedChoices(event));
    this.$emit('change', choice);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ChoiceList/ChoiceList.scss';
</style>
