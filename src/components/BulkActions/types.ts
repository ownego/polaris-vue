import type { Ref } from 'vue';
import type {
  DisableableAction,
  ActionListSection,
  BadgeAction,
  MenuGroupDescriptor,
  Action,
} from '@/utilities/types';
import type { ButtonProps } from '@/components/Button/types';

export type BulkAction = DisableableAction & BadgeAction;

export type BulkActionListSection = ActionListSection;

export type AriaLive = 'off' | 'polite' | undefined;

export type BulkActionsProps = {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** The size of the buttons to render */
  buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
  /** Label for the bulk actions */
  label?: string;
  /** List is in a selectable state. Will only render the bulk actions when `true` */
  selectMode?: boolean;
  /** @deprecated Used for forwarding the ref. Use `ref` prop instead */
  innerRef?: Ref<any>;
  /** @deprecated If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** @deprecated The width of the BulkActions */
  width?: number;
}

export type BulkActionsEvents = {
  /** Callback when the select all checkbox is clicked */
  'toggle-all': [];
  /** Callback when more actions button is toggled */
  'more-action-popover-toggle': [isOpen: boolean];
  /** @deprecated Callback when selectable state of list is changed. Unused callback */
  'select-mode-toggle': [selectMode: boolean];
}
