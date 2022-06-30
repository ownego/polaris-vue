import type { DisableableAction } from '@/utilities/interface';

export interface PopoverableAction extends DisableableAction {
  popoverOpen: boolean;
  key: string;
  content: string;
  onAction(): void;
}

export interface ConnectedFilterControlProps {
  rightPopoverableActions?: PopoverableAction[] | null;
  disabled?: boolean;
  forceShowMorefiltersButton?: boolean;
  queryFieldHidden?: boolean;
}

export interface AppliedFilterInterface {
  /** A unique key used to identify the applied filter */
  key: string;
  /** A label for the applied filter */
  label: string;
  /** Callback when the remove button is pressed */
  onRemove(key: string): void;
}

export interface FilterInterface {
  /** A unique key used to identify the filter */
  key: string;
  /** The label for the filter */
  label: string;
  /** Whether or not the filter should have a shortcut popover displayed */
  shortcut?: boolean;
  /** Whether or not the filter is disabled */
  disabled?: boolean;
  /**
   * @default false
   * Whether or not the clear button is displayed
   */
  hideClearButton?: boolean;
}
