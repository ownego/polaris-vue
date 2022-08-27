import type { ActionListProps } from '@/components/ActionList/utils';
import type { MessageProps } from './components/Message/utils';

export interface MenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: ActionListProps['sections'];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
  message?: MessageProps;
  /** A boolean property indicating whether the menu is currently open */
  open: boolean;
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
}
