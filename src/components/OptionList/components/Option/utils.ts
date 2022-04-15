import type { ThumbnailProps } from '@/components/Thumbnail/utils';
import type { IconProps } from '@/components/Icon/utils';
import type { AvatarProps } from '@/components/Avatar/utils';

type Alignment = 'top' | 'center' | 'bottom';

interface OptionProps {
  id: string;
  value: string;
  section: number;
  index: number;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  verticalAlign?: Alignment;
  role?: string;
}
