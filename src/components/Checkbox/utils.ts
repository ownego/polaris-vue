export interface CheckboxProps {
 /**
   * Indicates the ID of the element that is controlled by the checkbox
   */
  ariaControl?: string;

  /**
   * Indicates the ID of the element that describes the checkbox
   */
  ariaDescribedBy?: string;

  /**
   * Visually hide the label
   */
  labelHidden?: boolean;

  /**
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   */
  checked?: boolean | 'indeterminate';

  /**
   * Disable input
   */
  disabled?: boolean;

  /**
   * ID for form input
   */
  id?: string;

  /**
   * Name for form input
   */
  name?: string;

  /**
   * Value for form input
   */
  value?: string | boolean;

  /**
   * Display an error message
   */
  error?: Error | boolean;
}
