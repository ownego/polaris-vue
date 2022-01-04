import { CheckboxProps } from '../Checkbox';

export interface RadioButtonProps {
   /* Indicates the ID of the element that describes the the radio button */
  ariaDescribedBy?: CheckboxProps['ariaDescribedBy'];

  /* Visually hide the label */
  labelHidden?: CheckboxProps['labelHidden'];

  /* Radio button is selected */
  checked?: boolean;

  /* Disable input */
  disabled?: CheckboxProps['disabled'];

  /* ID for form input */
  id?: CheckboxProps['id'];

  /* Name for form input */
  name?: CheckboxProps['name'];

  /* Value for form input */
  value?: CheckboxProps['value'];
}
