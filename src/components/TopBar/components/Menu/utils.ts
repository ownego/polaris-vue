import type { ActionListProps } from '@/components/ActionList/utils';
import type { PopoverProps } from '@/components/Popover/utils';
import type { MessageProps } from './components/Message/utils';

export interface MenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: ActionListProps['sections'];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the menu */
  message?: MessageProps;
  /** A boolean property indicating whether the menu is currently open */
  open: boolean;
  /** Accepts a color scheme for the contents of the menu */
  colorScheme?: PopoverProps['colorScheme'];
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
}
