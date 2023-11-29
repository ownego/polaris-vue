import type {
  ColorTextAlias,
  ColorBackgroundAlias,
  ColorBorderAlias,
  BorderWidthScale,
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';
import type {ResponsiveProp} from '@/utilities/css';

type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';

type LineStyles = 'solid' | 'dashed';
type Overflow = 'hidden' | 'scroll';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

type Spacing = ResponsiveProp<SpaceScale>;

export interface BoxProps {
  /** children of box
   * @default slot
   */
  /** HTML Element type
   * @default 'div'
   */
  as?: Element;
  /** Background color */
  background?: ColorBackgroundAlias;
  /** Border color */
  borderColor?: ColorBorderAlias | 'transparent';
  /** Border style */
  borderStyle?: LineStyles;
  /** Border radius */
  borderRadius?: BorderRadiusAliasOrScale;
  /** Vertical end horizontal start border radius */
  borderEndStartRadius?: BorderRadiusAliasOrScale;
  /** Vertical end horizontal end border radius */
  borderEndEndRadius?: BorderRadiusAliasOrScale;
  /** Vertical start horizontal start border radius */
  borderStartStartRadius?: BorderRadiusAliasOrScale;
  /** Vertical start horizontal end border radius */
  borderStartEndRadius?: BorderRadiusAliasOrScale;
  /** Border width */
  borderWidth?: BorderWidthScale;
  /** Vertical start border width */
  borderBlockStartWidth?: BorderWidthScale;
  /** Vertical end border width */
  borderBlockEndWidth?: BorderWidthScale;
  /** Horizontal start border width */
  borderInlineStartWidth?: BorderWidthScale;
  /** Horizontal end border width */
  borderInlineEndWidth?: BorderWidthScale;
  /** Color of children */
  color?: ColorTextAlias;
  /** Minimum height of container */
  minHeight?: string;
  /** Minimum width of container */
  minWidth?: string;
  /** Maximum width of container */
  maxWidth?: string;
  /** Clip horizontal content of children */
  overflowX?: Overflow;
  /** Clip vertical content of children */
  overflowY?: Overflow;
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * padding='400'
   * padding={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  padding?: Spacing;
  /** Vertical start and end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlock='400'
   * paddingBlock={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingBlock?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockStart='400'
   * paddingBlockStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingBlockEnd='400'
   * paddingBlockEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingBlockEnd?: Spacing;
  /** Horizontal start and end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInline='400'
   * paddingInline={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingInline?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='400'
   * paddingInlineStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='400'
   * paddingInlineEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
   */
  paddingInlineEnd?: Spacing;
  /** Aria role */
  role?: 'status' | 'presentation' | 'menu' | 'listbox' | 'combobox' | 'group';
  /** Shadow on box */
  shadow?: ShadowAliasOrScale;
  /** Width of container */
  width?: string;
  // These could be moved to new layout component(s) in the future
  /** Position of box */
  position?: Position;
  /** Top position of box */
  insetBlockStart?: Spacing;
  /** Bottom position of box */
  insetBlockEnd?: Spacing;
  /** Left position of box */
  insetInlineStart?: Spacing;
  /** Right position of box */
  insetInlineEnd?: Spacing;
  /** Opacity of box */
  opacity?: string;
  /** Outline color */
  outlineColor?: ColorBorderAlias;
  /** Outline style */
  outlineStyle?: LineStyles;
  /** Outline width */
  outlineWidth?: BorderWidthScale;
  /** Visually hide the contents during print */
  printHidden?: boolean;
  /** Visually hide the contents (still announced by screenreader) */
  visuallyHidden?: boolean;
  /** z-index of box */
  zIndex?: string;
}
