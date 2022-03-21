import type { BaseButton } from '@/utilities/type';

export interface UnstyledButtonProps extends BaseButton {
  /** A custom class name to apply styles to button */
  className?: string;
  [key: string]: any;
}
