import { inject, type ComputedRef } from 'vue';
import type { Theme, ThemeName } from '@shopify/polaris-tokens';

export default function useTheme() {
  const theme = inject('theme') as Theme;

  if (!theme) {
    throw new Error(
      'No theme was provided.',
    );
  }

  return theme;
}

export function useThemeName() {
  const themeName = inject<ComputedRef<ThemeName>>('themeName');

  if (!themeName || !themeName.value) {
    throw new Error(
      'No themeName was provided.'
    );
  }

  return themeName;
}
