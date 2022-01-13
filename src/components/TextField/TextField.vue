<template lang="pug">
Labelled(
  :id="uniqueId",
  :error="error",
  :action="labelAction",
  :labelHidden="labelHidden",
  :requiredIndicator="requiredIndicator",
)
  template(name="label")
    slot(name="label")
  template(name="help-text")
    slot(name="help-text")
  Connected
    template(name="left")
      slot(name="connected-left")
    template(name="right")
      slot(name="connected-right")
    div(
      :class="wrapperClassName",
      @focus="onFocus",
      @click="onClick",
      @blur="onBlur",
    )
      div(
        v-if="$slots.prefix",
        :id="`${uniqueId}Prefix`",
        :class="prefixClassName",
        ref="prefixRef",
      )
        slot(name="prefix")
      component(
        :is="multiline ? 'textarea' : 'input'",
        :id="uniqueId",
        :name="name",
        :disabled="disabled",
        :readOnly="readOnly",
        :role="role",
        :autoFocus="autoFocus",
        :value="value",
        :placeholder="placeholder",
        :style="style",
        :autoComplete="autoComplete",
        :class="inputClassName",
        ref="inputRef",
        :min="min",
        :max="max",
        :step="step",
        :minLength="minLength",
        :maxLength="maxLength",
        :spellCheck="spellCheck",
        :pattern="pattern",
        :inputMode="inputMode",
        :type="inputType",
        :aria-describedby="formattedDescribedBy",
        :aria-labelledby="formattedLabelledBy",
        :aria-invalid="Boolean(error)",
        :aria-owns="ariaOwns",
        :aria-activedescendant="ariaActiveDescendant",
        :aria-autocomplete="ariaAutocomplete",
        :aria-controls="ariaControls",
        :aria-expanded="ariaExpanded",
        :aria-required="requiredIndicator",
        v-bind="normalizeAriaMultiline(multiline)",
        @input="$emit('input', $event.target.value)",
      )
      div(
        v-if="$slots.suffix",
        :id="`${uniqueId}Suffix`",
        :class="suffixClassName",
        ref="suffixRef",
      )
        slot(name="suffix")
      div(
        v-if="showCharacterCount",
        :class="characterCountClassName",
        aria-label=characterCountLabel,
        aria-live=focus ? 'polite' : 'off',
        aria-atomic="true",
      )
        p {{ characterCountText }}
      button(
        v-if="clearButtonVisible && clearButton",
        :class="clearButtonClassName",
        :disabled="disabled",
        @click="$emit('clear-btn-clicked')",
      )
        VisuallyHidden
          p Clear button
        Icon(:source="clearIcon" color="base")
      Spinner(
        v-if="type === 'number' && step !== 0 && !disabled && !readOnly",
      )
      div(:class="backdropClassName")
      Resizer(
        v-if="multiline",
        :current-height="height",
        :minimum-lines="typeof multiline === 'number' ? multiline : 1",
        @height-change="handleExpandingResize",
      )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import CircleCancelMinor from '@shopify/polaris-icons/dist/svg/CircleCancelMinor.svg';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { Error, Action } from 'types/type';
import { useUniqueId } from '@/utilities/unique-id';
import { Connected, Icon, Labelled } from '@/components';
import { VisuallyHidden } from '../VisuallyHidden';
import { helpTextID, labelID } from '../Labelled/utils';
import { Resizer, Spinner } from './components';
import styles from '@/classes/TextField.json';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

type Alignment = 'left' | 'center' | 'right';

type InputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

@Component({
  components: {
    VisuallyHidden,
    Labelled,
    Connected,
    Icon,
    Resizer,
    Spinner,
  },
})
export default class TextField extends Vue {
  @Ref('prefixRef') prefixRef!: HTMLDivElement;

  @Ref('suffixRef') suffixRef!: HTMLDivElement;

  /** Hint text to display */
  @Prop({ type: String })
  public placeholder!: string;

  /** Initial value for the input */
  @Prop({ type: String })
  public value!: string;

  /** Adds an action to the label */
  @Prop({ type: Array })
  public labelAction!: Action;

  /** Visually hide the label */
  @Prop({ type: Boolean })
  public labelHidden!: boolean;

  /** Disable the input */
  @Prop({ type: Boolean })
  public disabled!: boolean;

  /** Show a clear text button in the input */
  @Prop({ type: Boolean })
  public clearButton!: boolean;

  /** Disable editing of the input */
  @Prop({ type: Boolean })
  public readOnly!: boolean;

  /** Automatically focus the input */
  @Prop({ type: Boolean })
  public autoFocus!: boolean;

  /** Force the focus state on the input */
  @Prop({ type: Boolean })
  public focused!: boolean;

  /** Allow for multiple lines of input */
  @Prop({ type: Boolean })
  public multiline!: boolean;

  /** Error to display beneath the label */
  @Prop({ type: [String, Boolean, Array, Object, Function] })
  public error!: Error | boolean;

  /** Determine type of input */
  @Prop({ type: String })
  public type!: Type;

  /** Name of the input */
  @Prop({ type: String })
  public name!: string;

  /** ID for the input */
  @Prop({ type: String })
  public id!: string;

  /** Defines a specific role attribute for the input */
  @Prop({ type: String })
  public role!: string;

  /** Limit increment value for numeric and date-time inputs */
  @Prop({ type: Number })
  public step!: number;

  /**
   * Enable automatic completion by the browser.
   * Set to "off" when you do not want the browser to fill in info
   */
  @Prop({ type: String })
  public autoComplete!: string;

  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  @Prop({ type: [Number, String] })
  public max!: number | string;

  /** Maximum character length for an input */
  @Prop({ type: Number })
  public maxLength!: number;

  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  @Prop({ type: [Number, String] })
  public maxHeight!: number | string;

  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  @Prop({ type: [Number, String] })
  public min!: number | string;

  /** Minimum character length for an input */
  @Prop({ type: Number })
  public minLength?: number;

  /** A regular expression to check the value against */
  @Prop({ type: String })
  public pattern!: string;

  /** Choose the keyboard that should be used on mobile devices */
  @Prop({ type: String })
  public inputMode!: InputMode;

  /** Indicate whether value should have spelling checked */
  @Prop({ type: Boolean })
  public spellCheck!: boolean;

  /** Indicates the id of a component owned by the input */
  @Prop({ type: String })
  public ariaOwns!: string;

  /** Indicates whether or not a Popover is displayed */
  @Prop({ type: Boolean })
  public ariaExpanded!: boolean;

  /** Indicates the id of a component controlled by the input */
  @Prop({ type: String })
  public ariaControls!: string;

  /** Indicates the id of a related component’s visually focused element to the input */
  @Prop({ type: String })
  ariaActiveDescendant!: string;

  /** Indicates what kind of user input completion suggestions are provided */
  @Prop({ type: String })
  ariaAutocomplete!: string;

  /** Indicates whether or not the character count should be displayed */
  @Prop({ type: Boolean })
  showCharacterCount!: boolean;

  /** Determines the alignment of the text in the input */
  @Prop({ type: String })
  align!: Alignment;

  /** Visual required indicator, adds an asterisk to label */
  @Prop({ type: Boolean })
  requiredIndicator!: boolean;

  /** Indicates whether or not a monospaced font should be used */
  @Prop({ type: Boolean })
  monospaced!: boolean;

  public height!: number;

  public focus!: boolean;

  public clearIcon = CircleCancelMinor;

  public prefixClassName = styles.Prefix;

  public suffixClassName = styles.Suffix;

  public clearButtonClassName = styles.ClearButton;

  get uniqueId(): string {
    return useUniqueId('TextField', this.id);
  }

  get inputType(): string {
    return this.type === 'currency' ? 'text' : this.type;
  }

  get normalizedValue(): string {
    return typeof this.value === 'string' ? this.value : '';
  }

  get normalizedStep(): number {
    return this.step ? this.step : 1;
  }

  get normalizeMax(): number | string {
    return this.max ? this.max : Infinity;
  }

  get normalizeMin(): number | string {
    return this.min ? this.min : -Infinity;
  }

  get style() {
    return this.multiline && this.height
      ? { height: this.height, maxHeight: this.maxHeight }
      : null;
  }

  get wrapperClassName(): string {
    return classNames(
      styles.TextField,
      Boolean(this.normalizedValue) && styles.hasValue,
      this.disabled && styles.disabled,
      this.readOnly && styles.readOnly,
      this.error && styles.error,
      this.multiline && styles.multiline,
      this.focus && styles.focus,
    );
  }

  get inputClassName(): string {
    const inputAlignVariation = this.$slots.suffix
      && styles[variationName('Input-align', this.align) as keyof typeof styles];

    return classNames(
      styles.Input,
      inputAlignVariation,
      this.$slots.suffix && styles['Input-suffixed'],
      this.clearButton && styles['Input-hasClearButton'],
      this.monospaced && styles.monospaced,
    );
  }

  get characterCountClassName(): string {
    return classNames(
      styles.CharacterCount,
      this.multiline && styles.AlignFieldBottom,
    );
  }

  get backdropClassName(): string {
    const leftVariation = styles['Backdrop-connectedLeft' as keyof typeof styles];
    const rightVariation = styles['Backdrop-connectedRight' as keyof typeof styles];

    return classNames(
      styles.Backdrop,
      this.$slots['connected-left'] && leftVariation,
      this.$slots['connected-right'] && rightVariation,
    );
  }

  get characterCount(): number {
    return this.normalizedValue.length;
  }

  get characterCountText(): string | number {
    return !this.maxLength
      ? this.characterCount
      : `${this.characterCount}/${this.maxLength}`;
  }

  get clearButtonVisible(): boolean {
    return this.normalizedValue !== '';
  }

  get formattedDescribedBy(): string | undefined {
    const describedBy: string[] = [];

    if (this.error) {
      describedBy.push(`${this.uniqueId}Error`);
    }

    if (this.$slots['help-text']) {
      describedBy.push(helpTextID(this.uniqueId));
    }

    if (this.showCharacterCount) {
      describedBy.push(`${this.uniqueId}CharacterCounter`);
    }

    return describedBy.length
      ? describedBy.join(' ')
      : undefined;
  }

  get formattedLabelledBy(): string {
    const labelledBy: string[] = [];

    if (this.$slots.prefix) {
      labelledBy.push(`${this.uniqueId}Prefix`);
    }

    if (this.$slots.suffix) {
      labelledBy.push(`${this.uniqueId}Suffix`);
    }

    labelledBy.unshift(labelID(this.uniqueId));

    return labelledBy.join(' ');
  }

  public containsAffix(target: HTMLElement | EventTarget) {
    return (
      target instanceof HTMLElement
      && ((this.prefixRef && this.prefixRef.contains(target))
      || (this.suffixRef && this.suffixRef.contains(target)))
    );
  }

  public onFocus(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target)) return;

    this.focus = true;
    this.$emit('focus');
  }

  public onBlur(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target)) return;

    this.focus = false;
    this.$emit('blur');
  }

  public onClick(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target) || this.focus) {
      return;
    }

    (this.$refs.inputRef as HTMLInputElement)?.focus();
  }

  // eslint-disable-next-line class-methods-use-this
  public normalizeAriaMultiline(multiline?: boolean | number) {
    if (!multiline) return undefined;

    return Boolean(multiline) || multiline > 0
      ? { 'aria-multiline': true }
      : undefined;
  }

  public handleExpandingResize(height: number): void {
    this.height = height;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextField/TextField.scss';
</style>
