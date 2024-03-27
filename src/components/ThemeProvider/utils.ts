import { type ThemeNameLocal, themeNamesLocal } from './types';

export const isThemeNameLocal = (name: string): name is ThemeNameLocal =>
  themeNamesLocal.includes(name as any);
