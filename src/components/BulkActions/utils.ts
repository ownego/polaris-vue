import {
  DisableableAction,
  ActionListSection,
  BadgeAction,
  MenuGroupDescriptor,
} from '@/utilities/types';

export type BulkAction = DisableableAction & BadgeAction;

export type BulkActionListSection = ActionListSection;

export interface BulkActionsProps {
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** The width of the BulkActions */
  width: number;
}
