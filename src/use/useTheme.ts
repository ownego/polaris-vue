import { inject } from 'vue';
import type {Theme} from '@shopify/polaris-tokens';

export default function useTheme() {
  const theme = inject('theme') as Theme;

  if (!theme) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/AppProvider for implementation instructions.',
    );
  }

  return theme;
}
