import { VueNode } from '@/utilities/types';

interface Choice {
  /** Value of the choice */
  value: string;
  /** Label for the choice */
  label?: string;
  /** A unique identifier for the choice */
  id?: string;
  /** Disable choice */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: string;
  /** Indicates that the choice is aria-describedBy the error message */
  describedByError?: boolean;
}

export interface ChoiceListProps {
  /** Label for list of choices */
  title?: string;
  /** Collection of choices */
  choices: Choice[];
  /** Collection of selected choices */
  selected: string[];
  /** Name for form input */
  name?: string;
  /** Allow merchants to select multiple options at once */
  allowMultiple?: boolean;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Display an error message */
  error?: Error;
  /** Disable all choices **/
  disabled?: boolean;
  /** Callback when the selected choices change */
  onChange?(selected: string[], name: string): void;
  /** Indicates the tone of the choice list */
  tone?: 'magic';
}

export type ChoiceListSlots = {
  /** Label for list of choices */
  title: (_: VueNode) => void;
}

export type ChoiceSlots = {
  /** Label for the choice */
  label: (_: VueNode) => void;
  /** Additional text to aide in use */
  helpText: (_: VueNode) => void;
}
