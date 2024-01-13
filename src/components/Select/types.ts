import type { VNode } from 'vue';
import type { Error, VueNode } from '@/utilities/types';
import type { LabelledProps } from '@/components/Labelled/types';

export interface StrictOption {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: string;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
  /** Element to display to the left of the option label. Does not show in the dropdown. */
  prefix?: VueNode;
  /** Unique key applied to the option element. Defaults to option value prop when undefined. */
  key?: string;
}

export interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

export interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

export type SelectOption = string | StrictOption;

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

export type SelectProps = {
  /** List of options or option groups to choose from */
  options?: ((string | StrictOption) | SelectGroup)[];
  /** Label for the select */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Show the label to the left of the value, inside the control */
  labelInline?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Additional text to aide in use */
  helpText?: string;
  /** Example text to display as placeholder */
  placeholder?: string;
  /** ID for form input */
  id?: string;
  /** Name for form input */
  name?: string;
  /** Value for form input */
  value?: string;
  /** Display an error state */
  error?: Error | boolean;
  /** Visual required indicator, add an asterisk to label */
  requiredIndicator?: boolean;
  /** Indicates the tone of the select */
  tone?: 'magic';
}

export type SelectSlots = {
  /** Label for the select */
  label?: (_?: VueNode) => VNode[];
  /** Additional text to aide in use */
  helpText?: (_?: VueNode) => VNode[];
}

export type SelectEvents = {
  /** Callback when selection is changed */
  change: [selected: string, id: string];
  /** Callback when select is focused */
  focus: [event: FocusEvent];
  /** Callback when focus is removed */
  blur: [event: FocusEvent];
}
