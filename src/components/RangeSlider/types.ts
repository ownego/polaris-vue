import type { LabelledProps } from '@/components/Labelled/utils';
import type { ErrorType } from '@/utilities/type';

export type DualValue = [number, number];

export type RangeSliderValue = number | DualValue;

export interface RangeSliderProps {
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id?: string;
  /** Initial value for range input */
  value: RangeSliderValue;
  /** Minimum possible value for range input */
  min?: number;
  /** Maximum possible value for range input */
  max?: number;
  /** Increment value for range input changes */
  step?: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Display an error message */
  error?: ErrorType;
  /** Disable input */
  disabled?: boolean;
}
