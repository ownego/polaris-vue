<template lang="pug">
Labelled(
  :id="uniqueId",
  :error="error",
  :action="labelAction",
  :labelHidden="labelHidden",
  :requiredIndicator="requiredIndicator",
)
  template(slot="label")
    slot(name="label")
  template(slot="help-text")
    slot(name="help-text")
  Connected
    template(slot="left")
      slot(name="connected-left")
    template(slot="right")
      slot(name="connected-right")
    div(
      :class="wrapperClassName",
      @focus="handleFocus",
      @click="handleClick",
      @blur="handleBlur",
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
        :readonly="readOnly",
        :role="role",
        :autofocus="autoFocus",
        :value="value",
        :placeholder="placeholder",
        :style="style",
        :autocomplete="normalizeAutocomplete",
        :class="inputClassName",
        ref="inputRef",
        :min="min",
        :max="max",
        :step="step",
        :minlength="minLength",
        :maxlength="maxLength",
        :spellcheck="spellCheck",
        :pattern="pattern",
        :inputMode="inputMode",
        :rows="rows",
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
        @input="onChange",
        @keydown="handleKeyPress",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
      )
        template(v-if="multiline") {{ value }}
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
        @click="$emit('clear-button-click', id)",
      )
        VisuallyHidden
          p Clear button
        Icon(:source="clearIcon", color="base")
      TextFieldSpinner(
        v-if="type === 'number' && step !== 0 && !disabled && !readOnly",
        @change="handleNumberChange",
        @mousedown="handleButtonPress",
        @mouseup="handleButtonRelease",
      )
      div(:class="backdropClassName")
      Resizer(
        v-if="multiline",
        :contents="normalizedValue || placeholder",
        :currentHeight="height",
        :minimumLines="typeof multiline === 'number' ? multiline : 1",
        @height-change="handleExpandingResize",
      )
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Ref,
  Inject,
  Watch,
  Mixins,
} from 'vue-property-decorator';
import CircleCancelMinor from '@shopify/polaris-icons/dist/svg/CircleCancelMinor.svg';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { ComboboxTextFieldType } from 'polaris-react/src/utilities/combobox';
import styles from '@/classes/TextField.json';
import { UseUniqueId } from '@/mixins';
import { TextFieldProps } from './utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Connected } from '../Connected';
import { Icon } from '../Icon';
import { Labelled } from '../Labelled';
import { helpTextID, labelID } from '../Labelled/utils';
import { Resizer, Spinner as TextFieldSpinner } from './components';

@Component({
  components: {
    VisuallyHidden,
    Labelled,
    Connected,
    Icon,
    Resizer,
    TextFieldSpinner,
  },
})
export default class TextField extends Mixins(UseUniqueId) {
  @Inject({ default: {} }) comboboxTextFieldContext!: ComboboxTextFieldType;

  @Ref('prefixRef') prefixRef!: HTMLDivElement;

  @Ref('suffixRef') suffixRef!: HTMLDivElement;

  @Ref('inputRef') inputRef!: HTMLInputElement;

  @Prop({ type: String })
  public placeholder?: TextFieldProps['placeholder'];

  /** Initial value for the input */
  @Prop({ type: String })
  public value?: TextFieldProps['value'];

  /** Adds an action to the label */
  @Prop({ type: Object })
  public labelAction?: TextFieldProps['labelAction'];

  /** Visually hide the label */
  @Prop({ type: Boolean })
  public labelHidden?: TextFieldProps['labelHidden'];

  /** Disable the input */
  @Prop({ type: Boolean })
  public disabled?: TextFieldProps['disabled'];

  /** Show a clear text button in the input */
  @Prop({ type: Boolean })
  public clearButton?: TextFieldProps['clearButton'];

  /** Disable editing of the input */
  @Prop({ type: Boolean })
  public readOnly?: TextFieldProps['readOnly'];

  /** Automatically focus the input */
  @Prop({ type: Boolean })
  public autoFocus?: TextFieldProps['autoFocus'];

  /** Force the focus state on the input */
  @Prop({ type: Boolean })
  public focused?: TextFieldProps['focused'];

  /** Allow for multiple lines of input */
  @Prop({ type: [Number, Boolean] })
  public multiline!: boolean | number;

  /** Error to display beneath the label */
  @Prop({ type: [String, Boolean, Array, Object, Function] })
  public error?: TextFieldProps['error'];

  /** Determine type of input */
  @Prop({ type: String })
  public type?: TextFieldProps['type'];

  /** Name of the input */
  @Prop({ type: String })
  public name?: TextFieldProps['name'];

  /** ID for the input */
  @Prop({ type: String })
  public id?: TextFieldProps['id'];

  /** Defines a specific role attribute for the input */
  @Prop({ type: String })
  public role?: TextFieldProps['role'];

  /** Limit increment value for numeric and date-time inputs */
  @Prop({ type: Number })
  public step?: TextFieldProps['step'];

  /**
   * Enable automatic completion by the browser.
   * Set to "off" when you do not want the browser to fill in info
   */
  @Prop({ type: [String, Boolean], required: true })
  public autoComplete!: TextFieldProps['autoComplete'];

  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  @Prop({ type: [Number, String] })
  public max?: TextFieldProps['max'];

  /** Maximum character length for an input */
  @Prop({ type: Number })
  public maxLength?: TextFieldProps['maxLength'];

  /** Maximum height of the input element. Only applies when `multiline` is `true` */
  @Prop({ type: [Number, String] })
  public maxHeight?: TextFieldProps['maxHeight'];

  /** Mimics the behavior of the native HTML attribute, limiting the minimum value */
  @Prop({ type: [Number, String] })
  public min?: TextFieldProps['min'];

  /** Minimum character length for an input */
  @Prop({ type: Number })
  public minLength?: TextFieldProps['minLength'];

  /** A regular expression to check the value against */
  @Prop({ type: String })
  public pattern?: TextFieldProps['pattern'];

  /** Choose the keyboard that should be used on mobile devices */
  @Prop({ type: String })
  public inputMode?: TextFieldProps['inputMode'];

  /** Indicate whether value should have spelling checked */
  @Prop({ type: Boolean })
  public spellCheck?: TextFieldProps['spellCheck'];

  /** Indicates the id of a component owned by the input */
  @Prop({ type: String })
  public ariaOwns?: TextFieldProps['ariaOwns'];

  /** Indicates whether or not a Popover is displayed */
  @Prop({ type: Boolean })
  public ariaExpanded?: TextFieldProps['ariaExpanded'];

  /** Indicates the id of a component controlled by the input */
  @Prop({ type: String })
  public ariaControls?: TextFieldProps['ariaControls'];

  /** Indicates the id of a related component’s visually focused element to the input */
  @Prop({ type: String })
  ariaActiveDescendant?: TextFieldProps['ariaActiveDescendant'];

  /** Indicates what kind of user input completion suggestions are provided */
  @Prop({ type: String })
  ariaAutocomplete?: TextFieldProps['ariaAutocomplete'];

  /** Indicates whether or not the character count should be displayed */
  @Prop({ type: Boolean })
  showCharacterCount?: TextFieldProps['showCharacterCount'];

  /** Determines the alignment of the text in the input */
  @Prop({ type: String })
  align?: TextFieldProps['align'];

  /** Visual required indicator, adds an asterisk to label */
  @Prop({ type: Boolean })
  requiredIndicator?: TextFieldProps['requiredIndicator'];

  /** Indicates whether or not a monospaced font should be used */
  @Prop({ type: Boolean })
  monospaced?: TextFieldProps['monospaced'];

  public height = 200;

  public focus!: boolean;

  public clearIcon = CircleCancelMinor;

  public prefixClassName = styles.Prefix;

  public suffixClassName = styles.Suffix;

  public buttonPressTimer?: number;

  get uniqueId(): string {
    return this.useUniqueId('TextField', this.id);
  }

  get inputType() {
    return this.type === 'currency' ? 'text' : this.type;
  }

  get normalizedValue(): string {
    return typeof this.value === 'string' ? this.value : '';
  }

  get normalizeAutocomplete() {
    if (this.autoComplete === true) {
      return 'on';
    } if (this.autoComplete === false) {
      return 'off';
    }
    return this.autoComplete;
  }

  get normalizedStep(): number {
    return this.step ? this.step : 1;
  }

  get normalizedMax(): number | string {
    return this.max ? this.max : Infinity;
  }

  get normalizedMin(): number | string {
    return this.min ? this.min : -Infinity;
  }

  get style() {
    return this.multiline && this.height
      ? { height: `${this.height}px` }
      : null;
  }

  get clearButtonClassName() {
    return classNames(
      styles.ClearButton,
      !this.clearButtonVisible && styles.Hidden,
    );
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
    const inputAlignVariation = this.align && styles[
      variationName('Input-align', this.align) as keyof typeof styles
    ];

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

  get rows() {
    if (!this.multiline) return undefined;

    return typeof this.multiline === 'number' ? this.multiline : 1;
  }

  @Watch('focused')
  onFocusedChanged() {
    if (!this.inputRef) return;

    if (this.focused) {
      (this.$refs.inputRef as HTMLInputElement).focus();
    } else {
      (this.$refs.inputRef as HTMLInputElement).blur();
    }
  }

  public containsAffix(target: HTMLElement | EventTarget) {
    return (
      target instanceof HTMLElement
      && ((this.prefixRef && this.prefixRef.contains(target))
      || (this.suffixRef && this.suffixRef.contains(target)))
    );
  }

  public handleClick(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target) || this.focus) {
      return;
    }

    (this.$refs.inputRef as HTMLInputElement)?.focus();
  }

  public handleFocus(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target)) return;

    this.focus = true;
  }

  public handleBlur(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.containsAffix(target)) return;

    this.focus = false;
  }

  public onChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (this.comboboxTextFieldContext.onTextFieldChange) {
      this.comboboxTextFieldContext.onTextFieldChange();
    }

    this.$emit('input', target.value);
    this.$emit('change', event);
  }

  public handleNumberChange(payload: number): void {
    // Returns the length of decimal places in a number
    const dpl = (num: number) => (num.toString().split('.')[1] || []).length;
    const numericValue = this.value ? parseFloat(this.value) : 0;

    if (typeof numericValue !== 'number') return;

    /**
     * Making sure the new value has the same length of decimal places as the
     * step / value has.
     */
    const decimalPlaces = Math.max(dpl(numericValue), dpl(this.normalizedStep));

    const newValue = Math.min(
      Number(this.normalizedMax),
      Math.max(numericValue + payload * this.normalizedStep, Number(this.normalizedMin)),
    );

    // re-bind value for input
    (this.$refs.inputRef as HTMLInputElement).value = String(newValue.toFixed(decimalPlaces));

    this.$emit('input', String(newValue.toFixed(decimalPlaces)));
  }

  // eslint-disable-next-line class-methods-use-this
  public handleKeyPress(event: KeyboardEvent): void {
    const { key, which } = { ...event };
    const numbersSpec = /[\d.eE+-]$/;

    if (this.type !== 'number' || which !== 13 || numbersSpec.test(key)) {
      return;
    }

    event.preventDefault();
  }

  public handleButtonPress(): void {
    const minInterval = 50;
    const decrementBy = 10;
    let interval = 200;

    const onChangeInterval = () => {
      if (interval > minInterval) interval -= decrementBy;
      this.handleNumberChange(0);
      this.buttonPressTimer = window.setTimeout(
        onChangeInterval,
        interval,
      );
    };

    this.buttonPressTimer = window.setTimeout(onChangeInterval, interval);

    document.addEventListener('mouseup', this.handleButtonRelease, {
      once: true,
    });
  }

  public handleButtonRelease(): void {
    clearTimeout(this.buttonPressTimer);
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
