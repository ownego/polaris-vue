import type { Action, ErrorType } from '@/utilities/type';
import { labelID } from '../Label/utils';
import type { LabelProps } from "../Label/utils";

export { labelID }

export function errorID(id: string) {
  return `${id}Error`;
}

export function helpTextID(id: string) {
  return `${id}HelpText`;
}

export interface LabelledProps {
  /** A unique identifier for the label */
  id: LabelProps['id'];
  /** Error to display beneath the label */
  error?: ErrorType | boolean;
  /** An action */
  action?: Action;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}
