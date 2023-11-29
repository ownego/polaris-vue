import type { ThemeName, Theme } from '@shopify/polaris-tokens';
import { themes } from '@shopify/polaris-tokens';

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName];
}
