import type { IconableAction, DisableableAction, BadgeAction, DestructableAction } from '@/utilities/interface';
export interface ActionListItemDescriptor extends IconableAction, DisableableAction, BadgeAction, DestructableAction {
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Additional hint text to display with item */
    helpText?: string;
    /** Image source */
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