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
        :disabled="choice.disabledField || disabled",
        :ariaDescribedBy="generateAriaDescribedBy(choice.describedByErrorField)",
        @change="onChange",
      )
        template(slot="label")
          span {{ choice.label }}
        template(slot="helpText")
          span {{ choice.helpText }}
      component(
        v-if="choice.renderChildrenField",
        :is="choice.renderChildrenField",
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
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ChoiceList.json';
import type { Error } from 'types/type';
import { useUniqueId } from '@/utilities/unique-id';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { InlineError } from '../InlineError';
import { errorTextID } from '../InlineError';

@Component({
  components: {
    Checkbox,
    RadioButton,
    InlineError,
  },
})
export default class ChoiceList extends Vue {
  /**
   * Collection of choices
   */
  @Prop({ type: Array, required: true })
  public choices!: object[];

  /**
   * Collection of selected choices.
   * v-model will automatically bind to this prop
   */
  @Prop({ type: Array, required: true })
  public value!: string[];

  /**
   * Name for form input
   */
  @Prop({ type: String })
  public name!: string;

  /**
   * Allow merchants to select multiple options at once
   */
  @Prop({ type: Boolean })
  public allowMultiple!: boolean;

  /**
   * Toggles display of the title
   */
  @Prop({ type: Boolean })
  public titleHidden!: boolean;

  /**
   * Display an error message
   */
  @Prop({ type: [String, Object, Function, Array] })
  public error!: Error;

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
    const name = useUniqueId('ChoiceList', this.name);
    return this.allowMultiple ? `${this.name}Multiple` : name;
  }

  public generateAriaDescribedBy(describedByErrorField: boolean): string {
    return this.error && describedByErrorField
      ? errorTextID(this.finalName)
      : '';
  }

  @Emit('input')
  public onChange(event: InputEvent): string[] {
    return this.updateSelectedChoices(event);
  }

  public updateSelectedChoices(event: InputEvent): string[] {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      return this.allowMultiple
        ? [...this.value, target.value]
        : [target.value];
    }

    return this.value
      .filter((selectedChoice) => selectedChoice !== target.value);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ChoiceList/ChoiceList.scss';
</style>
