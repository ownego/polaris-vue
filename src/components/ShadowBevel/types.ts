import type {
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
} from '@shopify/polaris-tokens';

import type {ResponsiveProp} from '@/utilities/css';

type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';

export interface ShadowBevelProps {
  as?: Element;
  /** The box-shadow applied to the root element. */
  boxShadow: ShadowAliasOrScale;
  /** The border-radius applied to both the root and pseudo elements. */
  borderRadius: BorderRadiusAliasOrScale;
  /** The z-index applied to the pseudo element. */
  zIndex?: string;
  /**
   * Enable/disable the bevel effect.
   * Note: This also disables the border-radius and box-shadow.
   * @default true
   */
  bevel?: ResponsiveProp<boolean>;
}
