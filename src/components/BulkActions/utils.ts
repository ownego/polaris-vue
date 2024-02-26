import {
  DisableableAction,
  ActionListSection,
  BadgeAction,
  MenuGroupDescriptor,
  Action,
} from '@/utilities/types';
import type { ButtonProps } from '@/components/Button/types';

export type BulkAction = DisableableAction & BadgeAction;

export type BulkActionListSection = ActionListSection;

export interface BulkActionsProps {
  /** List is in a selectable state */
  selectMode?: boolean;
    /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Callback when the select all checkbox is clicked */
  onToggleAll?(): void;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** If the BulkActions is currently sticky in view */
  /** Used for forwarding the ref */
  innerRef?: any;
  /** The size of the buttons to render */
  buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
  /** @deprecated If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** @deprecated The width of the BulkActions */
  width?: number;
}
