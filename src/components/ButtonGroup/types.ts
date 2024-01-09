type Gap = 'extraTight' | 'tight' | 'loose';

type Variant = 'segmented';

export interface ButtonGroupProps {
  /** Determines the space between button group items */
  gap?: Gap;
  /** Styling variant for group */
  variant?: Variant;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
  /** Prevent buttons in button group from wrapping to next line */
  noWrap?: boolean;
}

