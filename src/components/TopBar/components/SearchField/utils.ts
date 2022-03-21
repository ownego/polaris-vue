export interface SearchFieldProps {
  /** Initial value for the input */
  modelValue: string;
  /** Hint text to display */
  placeholder?: string;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Force a state where search is active but the text field component is not focused */
  active?: boolean;
  /** Show a border when the search field is focused */
  showFocusBorder?: boolean;
}
