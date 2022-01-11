<template lang="pug">
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CircleCancelMinor from '@shopify/polaris-icons/dist/svg/CircleCancelMinor.svg';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { Error } from 'types/type';
import { useUniqueId } from '@/utilities/unique-id';
import {
  VisuallyHidden,
  Labelled,
  Connected,
  Icon,
} from '@/components';
import { LabelledProps, helpTextID, labelID } from '../Labelled/utils';
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
  },
})
export default class TextField extends Vue {
  /** Hint text to display */
  @Prop({ type: String })
  public hint!: string;

  /** Initial value for the input */
  @Prop({ type: String })
  public value!: string;

  /** Adds an action to the label */
  @Prop({ type: Array })
  public labelAction!: LabelledProps[];

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

  get uniqueId(): string {
    return useUniqueId('TextField', this.id);
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextField/TextField.scss';
</style>
