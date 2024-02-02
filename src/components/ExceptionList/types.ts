import type { VueNode } from '@/utilities/types';
import { IconProps } from '../Icon/Icon.vue';

type Description =
  | string
  | VueNode
  | (string | VueNode)[];

export interface Item {
  /** Set the color of the icon and title for the given item. */
  status?: 'critical' | 'warning';
  /** Icon displayed by the list item */
  icon?: IconProps['source'];
  /** Text displayed beside the icon */
  title?: string;
  /** Text displayed for the item */
  description?: Description;
  /** Should the description be truncated at end of line */
  truncate?: boolean;
}

export interface ExceptionListProps {
  /** Collection of items for list */
  items: Item[];
}
