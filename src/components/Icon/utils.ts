import type { IconSource } from '@/utilities/type';

export type Color = 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary';

export interface IconProps {
  /** The contents to display in the icon */
  source: IconSource;
  /** Set the color for the icon */
  color?: Color;
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
}
