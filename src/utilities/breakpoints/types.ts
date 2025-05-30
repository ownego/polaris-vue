import type { Ref } from 'vue';
import type {
  BreakpointsAlias,
  BreakpointsAliasDirection,
} from '@shopify/polaris-tokens';

/**
 * Directional alias for each Polaris `breakpoints` token.
 *
 * @example 'smUp' | 'smDown' | 'smOnly' | 'mdUp' | etc.
 */
export type BreakpointsDirectionAlias =
  `${BreakpointsAlias}${Capitalize<BreakpointsAliasDirection>}`;

/**
 * Match results for each directional Polaris `breakpoints` alias.
 */
export type BreakpointsMatches = {
  [DirectionAlias in BreakpointsDirectionAlias]: boolean;
};

export interface BreakpointsContextType {
  breakpoints: Ref<BreakpointsMatches>;
}
