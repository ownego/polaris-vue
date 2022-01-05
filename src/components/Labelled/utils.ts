import { labelID, LabelProps } from '../Label';

export { labelID };

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
  error?: Error | boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: LabelProps['requiredIndicator'];
}
