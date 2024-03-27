import type { VNode } from 'vue';
import type { VueNode } from '@/utilities/types';

export const themeNamesLocal = ['light', 'dark-experimental'] as const;

export type ThemeNameLocal = typeof themeNamesLocal[number];

export type ThemeProviderProps = {
  as?: string;
  className?: string;
  theme?: ThemeNameLocal;
}

export type ThemeProviderSlots = {
  default: (_?: VueNode) => VNode[];
}
