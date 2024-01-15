import type { Width, Padding, BorderRadius } from '../../types';

export type TooltipOverlayProps = {
  id: string;
  active: boolean;
  activator: HTMLElement;
  accessibilityLabel?: string;
  width?: Width;
  padding?: Padding;
  borderRadius?: BorderRadius;
  zIndexOverride?: number;
  onClose(): void;
  instant?: boolean;
};
