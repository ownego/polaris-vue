export interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

export interface StrictOption {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: string;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
  /** ID to use in slot to display the option label. Does not show in the dropdown. */
  id?: string;
}

export type SelectOption = string | StrictOption;

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

export interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}
