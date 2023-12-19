import type {
  BreakpointsAlias,
  ColorBackgroundAlias,
  SpaceScale,
} from '@shopify/polaris-tokens';
import type {ResponsiveProp} from '@/utilities/css';

type Spacing = ResponsiveProp<SpaceScale>;

export interface CardProps {
  background?: ColorBackgroundAlias;
  /** The spacing around the card
   * @default {xs: '400', sm: '500'}
   * @example
   * padding='400'
   * padding={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  padding?: Spacing;
  /** Border radius value above a set breakpoint
   * @default 'sm'
   */
  roundedAbove?: BreakpointsAlias;
}
