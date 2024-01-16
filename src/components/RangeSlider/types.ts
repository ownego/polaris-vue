import type { VNode } from 'vue';
import type { LabelledProps } from '@/components/Labelled/types';
import type { Error, VueNode } from '@/utilities/types';

export type DualValue = [number, number];

export type RangeSliderValue = number | DualValue;

export type RangeSliderProps = {
  /** Label for the range input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id?: string;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Additional text to aid in use */
  helpText?: string;
  /** Display an error message */
  error?: Error;
  /** Disable input */
  disabled?: boolean;
  /** Element to display before the input */
  prefix?: string;
  /** Element to display after the input */
  suffix?: string;
}

export type RangeSliderSlots = {
  /** Label for the range input */
  label?: (_?: VueNode) => VNode[];
  /** Additional text to aid in use */
  helpText?: (_?: VueNode) => VNode[];
  /** Element to display before the input */
  prefix?: (_?: VueNode) => VNode[];
  /** Element to display after the input */
  suffix?: (_?: VueNode) => VNode[];
}

export type RangeSliderEvents = {
  /** Callback when the range input is changed */
  'change': [value: RangeSliderValue, id: string];
  /** Callback when range input is focused */
  'focus': [];
  /** Callback when focus is removed */
  'blur': [];
}
