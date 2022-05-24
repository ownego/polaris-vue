import type { ColorScheme } from '@shopify/polaris-tokens';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export const STYLE_SHEET_ID = 'polaris-custom-properties';

export interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** Class name applied to the root element. */
  className?: string;
  /** Element used for the root node. */
  as?: string;
}
