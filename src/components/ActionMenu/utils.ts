import type { MenuActionDescriptor } from '@/utilities/interface';
import type { MenuGroupDescriptor } from './components/MenuGroup/utils';

export interface ActionMenuProps {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  /** Roll up all actions into a Popover > ActionList */
  rollup?: boolean;
  /** Label for rolled up actions activator */
  rollupActionsLabel?: string;
}
