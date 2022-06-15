import type { DisableableAction, BadgeAction } from '@/utilities/interface';
import type { ActionListSection } from '@/components/ActionList/utils';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import type { Action } from '@/utilities/type';

export type BulkAction = DisableableAction & BadgeAction;

export type BulkActionListSection = ActionListSection;

export interface BulkActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Whether to render the small screen BulkActions or not */
  smallScreen?: boolean;
  /** Label for the bulk actions */
  label?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
}
