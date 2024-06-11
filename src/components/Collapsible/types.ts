import type { MotionDurationScale } from '@shopify/polaris-tokens';

export interface Transition {
  /** Expand the collpsible on render. */
  animateIn?: boolean;
  /** Assign a transition duration to the collapsible animation. */
  duration?: string;
  /** Assign a transition delay to the collapsible animation */
  delay?: MotionDurationScale;
  /** Assign a transition timing function to the collapsible animation */
  timingFunction?: string;
}

export type AnimationState = 'idle' | 'measuring' | 'animating';
