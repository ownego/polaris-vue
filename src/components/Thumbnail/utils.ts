import type { IconSource } from '@/utilities/type';

type Size = 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | IconSource;
  /** Alt text for the thumbnail image */
  alt: string;
}
