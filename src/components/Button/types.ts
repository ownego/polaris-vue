import { IconSource, BaseButton } from '@/utilities/types';
import type {
  Action,
  DisableableAction,
  DestructableAction,
  IconableAction,
  OutlineableAction,
  LoadableAction,
  PlainAction,
} from '@/utilities/types';

export interface ButtonProps extends BaseButton {
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'micro' | 'slim' | 'medium' | 'large';
  /** Changes the inner text alignment of the button */
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
  /** Allows the button to grow to the width of its container */
  fullWidth?: boolean;
  /** Displays the button with a disclosure icon. Defaults to `down` when set to true */
  disclosure?: 'down' | 'up' | 'select' | boolean;
  /** Removes underline from button text (including on interaction)
   * @deprecated Use a variant instead
   */
  removeUnderline?: boolean;
  /** Icon to display to the left of the button content */
  icon?: IconSource;
  /** Indicates whether or not the button is the primary navigation link when rendered inside of an `IndexTable.Row` */
  dataPrimaryLink?: boolean;
  /** Sets the color treatment of the Button. */
  tone?: 'critical' | 'success';
  /** Changes the visual appearance of the Button. */
  variant?: 'plain' | 'primary' | 'secondary' | 'tertiary' | 'monochromePlain';
}

export type ButtonEmits = {
  /** Callback when clicked */
  'click': [];
  /** Callback when button becomes focussed */
  'focus': [];
  /** Callback when focus leaves button */
  'blur': [];
  /** Callback when a keypress event is registered on the button */
  'keypress': [event: KeyboardEvent];
  /** Call back when a keyup event is registered on the button */
  'keyup': [event: KeyboardEvent];
  /** Callback when a keydown event is registered on the button */
  'keydown': [event: KeyboardEvent];
  /** Callback when mouse enter */
  'mouseenter': [];
  /** Callback when element is touched */
  'touchstart': [];
  /** Callback when pointerdown event is being triggered */
  'pointerdown': [event: PointerEvent];
}

export interface ComplexAction
  extends Action,
    DisableableAction,
    DestructableAction,
    IconableAction,
    OutlineableAction,
    LoadableAction,
    PlainAction {}
