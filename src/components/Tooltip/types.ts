import type {
  BorderRadiusAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

export type Width = 'default' | 'wide';
export type Padding = 'default' | Extract<SpaceScale, '400'>;
export type BorderRadius = Extract<BorderRadiusAliasOrScale, '100' | '200'>;
