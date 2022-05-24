import type { PositionedOverlayProps } from '@/components/PositionedOverlay/utils';

export interface TooltipProps {
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /** The content to display within the tooltip */
  content?: string;
  /** Dismiss tooltip when not interacting with its children */
  dismissOnMouseOut?: PositionedOverlayProps['preventInteraction'];
  /**
   * The direction the tooltip tries to display
   * @default 'below'
   */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
}
