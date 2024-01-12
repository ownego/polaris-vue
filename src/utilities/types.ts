import type { Component } from 'vue';

export type Target = '_blank' | '_self' | '_parent' | '_top';

export type IconSource = Component | string | (string | Component)[]

export type VueNode = string | number | boolean | Component | Element | null | undefined;

export interface BaseButton {
  /** A unique identifier for the button */
  id?: string;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
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
  /** Indicates the current checked state of the button when acting as a toggle or switch */
  ariaChecked?: 'false' | 'true';
}

export interface Action {
  /** A unique identifier for the action */
  id?: string;
  /** Content the action displays */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** A destination to link to, rendered in the action */
  url?: string;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Callback when an action takes place */
  onAction?(): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
}

export interface DisableableAction extends Action {
  /** Whether or not the action is disabled */
  disabled?: boolean;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: IconSource;
}

export interface LoadableAction extends Action {
  /** Should a spinner be displayed */
  loading?: boolean;
}

export interface OutlineableAction extends Action {
  /** Should action be displayed as an outlined button */
  outline?: boolean;
}

export interface PlainAction extends Action {
  /** Should action be displayed as a plain link */
  plain?: boolean;
}

export interface ComplexAction
  extends Action,
    DisableableAction,
    DestructableAction,
    IconableAction,
    OutlineableAction,
    LoadableAction,
    PlainAction {}
