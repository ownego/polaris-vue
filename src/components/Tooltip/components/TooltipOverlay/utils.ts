import type { Width, Padding, BorderRadius } from '../../types';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/types';

export type TooltipOverlayBaseProps = {
  id: string;
  active: boolean;
  activator: HTMLElement;
  accessibilityLabel?: string;
  width?: Width;
  padding?: Padding;
  borderRadius?: BorderRadius;
  zIndexOverride?: number;
  onClose?(): void;
  instant?: boolean;
};

export type TooltipOverlayProps = TooltipOverlayBaseProps & {
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
}
