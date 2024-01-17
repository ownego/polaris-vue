import type { VNode } from 'vue';
import type { VueNode, Error } from '@/utilities/types';

export interface Choice {
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
  /**  Method to render children with a choice */
  renderChildren?: VueNode;
}

export interface ChoiceListProps {
  /** Label for list of choices */
  title?: string;
  /** Collection of choices */
  choices: Choice[];
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
  /** Indicates the tone of the choice list */
  tone?: 'magic';
}

export type ChoiceListSlots = {
  /** Label for list of choices */
  title: (_: VueNode) => VNode[];
}

export type ChoiceListEvents = {
  /** Callback when the selected choices change */
  'change': [value: string[], name: string];
}
