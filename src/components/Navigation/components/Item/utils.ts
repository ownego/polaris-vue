import type { IconProps } from '@/components/Icon/utils';
import type { BadgeProps } from '@/components/Badge/utils';

interface ItemURLDetails {
  url?: string;
  matches?: boolean;
  exactMatch?: boolean;
  matchPaths?: string[];
  excludePaths?: string[];
  external?: boolean;
}

interface SubNavigationItem extends ItemURLDetails {
  url: string;
  label: string;
  disabled?: boolean;
  new?: boolean;
  onClick?(): void;
}

interface SecondaryAction {
  url: string;
  accessibilityLabel: string;
  icon: IconProps['source'];
  onClick?(): void;
}

interface BadgeItemProps extends BadgeProps {
  content: string;
}

export interface ItemProps extends ItemURLDetails {
  icon?: IconProps['source'];
  badge?: string | BadgeItemProps;
  label: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  selected?: boolean;
  exactMatch?: boolean;
  new?: boolean;
  subNavigationItems?: SubNavigationItem[];
  secondaryAction?: SecondaryAction;
  expanded?: boolean;
  shouldResizeIcon?: boolean;
}
