import { VueConstructor } from 'vue';

export type IconSource =
  | VueConstructor<Vue>
  | 'placeholder'
  | string;

export type Error =
  | string
  | VueConstructor<Vue>
  | (string | VueConstructor<Vue>)[];

export type Action = {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
};

export interface BaseButton {
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Replaces button text with a spinner while a background action is being performed */
  loading?: boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A valid WAI-ARIA role to define the semantic value of this element */
  role?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Indicates the ID of the element that describes the button */
  ariaDescribedBy?: string;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
  /** Callback when a keypress event is registered on the button */
  onKeyPress?(event: KeyboardEvent): void;
  /** Callback when a keyup event is registered on the button */
  onKeyUp?(event: KeyboardEvent): void;
  /** Callback when a keydown event is registered on the button */
  onKeyDown?(event: KeyboardEvent): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
}
