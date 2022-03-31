import type { IconSource } from '@/utilities/type';

export interface PrimaryActionType {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
}
