import type { ActionListItemDescriptor } from '@/components/ActionList/utils';
import type { IconableAction } from '@/utilities/type';

export interface MenuGroupDescriptor {
  badge?: {
    status: 'new';
    content: string;
  };
  /** Menu group title */
  title: string;
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** Disables action button */
  disabled?: boolean;
  /** Zero-indexed numerical position. Overrides the group's order in the menu. */
  index?: number;
  /** Visually hidden menu description for screen readers */
  accessibilityLabel?: string;
  /** Whether or not the menu is open */
  active?: boolean;
}
