import type { ColorScheme } from '@shopify/polaris-tokens';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** Element used for the root node. */
  as?: string;
}
