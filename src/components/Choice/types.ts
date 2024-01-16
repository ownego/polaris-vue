import type { SpaceScale } from '@shopify/polaris-tokens';
import type { ResponsiveProp } from '@/utilities/css';
import type { VueNode, Error } from '@/utilities/types';

type Spacing = ResponsiveProp<SpaceScale>;

export interface ChoiceBleedProps {
  /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleed='4'
   * bleed={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleed?: Spacing;
  /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedBlockStart='4'
   * bleedBlockStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedBlockStart?: Spacing;
  /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedBlockEnd='4'
   * bleedBlockEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedBlockEnd?: Spacing;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedInlineStart='4'
   * bleedInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * bleedInlineEnd='4'
   * bleedInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  bleedInlineEnd?: Spacing;
}

export interface ChoiceProps extends ChoiceBleedProps {
  /** A unique identifier for the choice */
  id: string;
  /**	Label for the choice */
  label?: string;
  /** Whether the associated form control is disabled */
  disabled?: boolean;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Added to the label element */
  labelClassName?: string;
  /** Grow to fill the space. Equivalent to width: 100%; height: 100% */
  fill?: ResponsiveProp<boolean>;
  /** Display an error message */
  error?: Error | boolean;
  /** Additional text to aide in use. Will add a wrapping <div> */
  helpText?: string;
  /** Indicates the tone of the choice */
  tone?: 'magic';
}

export interface ChoiceSlots {
  /**  Content to display inside the choice */
  default: (_: VueNode) => any;
  /** The label for the choice */
  label: (_: VueNode) => any;
  /** Additional text to aide in use. Will add a wrapping <div> */
  helpText: (_: VueNode) => any;
}
