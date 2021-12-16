<template lang="pug">
fieldset(
  :id="finalName",
  :class="className",
  :aria-invalid="error !== null",
)
  slot(:class="titleClassName")
  ul(:class="listClassName")
    li(
      v-for="choice, index in choices",
      :key="index",
    )
      component(
        :is="allowMultiple ? 'Checkbox' : 'RadioButton'",
        :id="finalName + index",
        :name="allowMultiple ? finalName + index : finalName",
        :value="choice.value",
        :disabled="choice.disabledField || disabled"
        :checked="choiceIsSelected(choice.value, selected)",
        :ariaDescribedBy="error && choice.describedByErrorField ? formattedAriaDescribedBy : null",
        @change="onChange",
      )
        template(slot="label")
          span {{ choice.label }}
        template(slot="helpText")
          span {{ choice.helpText }}
      div(
        v-if="choice.renderChildrenField",
        :id="finalName + index",
        :class="renderChildrenClassName",
      )
        slot(name="renderChildren")
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
import type { Error } from '@/type';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';
import { InlineError } from '../InlineError';
import { errorTextID } from '../InlineError/InlineError.vue';

@Component({
  components: {
    Checkbox,
    RadioButton,
    InlineError,
  },
})
export default class ChoiceList extends Vue {
  /**
   * Collection of selected choices
   */
  @Prop({ type: Array, required: true })
  public choices!: object[];

  /**
   * Collection of selected choices
   */
  @Prop({ type: Array, required: true })
  public selected!: string[];

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

  public renderChildrenClassName: string = styles.ChoiceChildren;

  get className(): string {
    return classNames(
      styles.ChoiceList,
      this.titleHidden && styles.titleHidden,
    );
  }

  get finalName(): string {
    return this.allowMultiple ? `${this.name}Multiple` : this.name;
  }

  get formattedAriaDescribedBy(): string {
    return errorTextID(this.finalName);
  }

  // eslint-disable-next-line class-methods-use-this
  public choiceIsSelected(value: string, selected: string[]): boolean {
    return selected.includes(value);
  }

  @Emit('change')
  public onChange(event: InputEvent): string[] {
    return this.updateSelectedChoices(event);
  }

  public updateSelectedChoices(event: InputEvent): string[] {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      return this.allowMultiple ? [...this.selected, target.value] : [target.value];
    }

    return this.selected.filter((selectedChoice) => selectedChoice !== target.value);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ChoiceList/ChoiceList.scss';
</style>
