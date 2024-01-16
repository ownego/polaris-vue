import type { VNode } from 'vue';
import type { VueNode } from '@/utilities/types';
import type { ResponsiveProp } from '@/utilities/css';
import type { ChoiceBleedProps } from '@/components/Choice/types';

export type RadioButtonProps = ChoiceBleedProps & {
  /** Indicates the ID of the element that describes the radio button */
  ariaDescribedBy?: string;
  /** Label for the radio button */
  label?: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Radio button is selected */
  checked?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Additional text to aide in use */
  helpText?: string;
  /** Indicates the tone of the text field */
  tone?: 'magic';
}

export type RadioButtonSlots = {
  /** Label for the radio button */
  label: (_?: VueNode) => VNode[];
  /** Additional text to aide in use */
  helpText: (_?: VueNode) => VNode[];
}

export type RadioButtonEvents = {
  /** Callback when the radio button is toggled */
  'change': [checked: boolean, value: string];
  /** Callback when radio button is focused */
  'focus': [];
  /** Callback when focus is removed */
  'blur': [];
}
