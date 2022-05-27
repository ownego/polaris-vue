import type { IconableAction, DisableableAction, BadgeAction, DestructableAction } from '@/utilities/interface';
import type { IconSource } from '@/utilities/type';

export interface ActionListItemDescriptor extends DisableableAction, DestructableAction {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** @deprecated Badge component */
  badge?: {
    status: 'new';
    content: string;
  };
  /** Additional hint text to display with item */
  helpText?: string;
  /** @deprecated Source of the icon */
  icon?: IconSource;
  /** @deprecated Image source */
  image?: string;
  /** Prefix source */
  prefixId?: string;
  /** Suffix source */
  suffixId?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** Defines a role for the action */
  role?: string;
}

export interface ActionListSection {
  /** Section title */
  title?: string;
  /** Collection of action items for the list */
  items: readonly ActionListItemDescriptor[];
}

export type ItemProps = ActionListItemDescriptor;

export interface ActionListProps {
  /** Collection of actions for list */
  items?: readonly ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'menuitem' | string;
}

export interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Whether or not the section is the first to appear */
  firstSection?: boolean;
}
