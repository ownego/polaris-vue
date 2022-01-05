export function labelID(id: string) {
  return `${id}Label`;
}

export interface LabelProps {
  /** A unique identifier for the label */
  id: string;
  /** Visually hide the label */
  hidden?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}
