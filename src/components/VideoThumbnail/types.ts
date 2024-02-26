export interface VideoThumbnailProps {
  /** URL source for thumbnail image. */
  thumbnailUrl: string;
  /**
   * Length of video in seconds.
   * @default 0
   */
  videoLength?: number;
  /**
   * Video progress in seconds. Displays a progress bar at the bottom of the thumbnail. Only renders when videoLength is also set.
   * @default 0
   */
  videoProgress?: number;
  /**
   * Indicate whether to allow video progress to be displayed
   * @default false
   */
  showVideoProgress?: boolean;
  /** Custom ARIA label for play button.
   * @default 'Play video of length {human readable duration}'
   */
  accessibilityLabel?: string;
}

export type VideoThumbnailEvents = {
  /** Callback on click or keypress of thumbnail. Use to trigger render of the video player in your chosen format, for example within a modal or fullscreen container. */
  'click': [];
  /** Callback on mouse enter, focus, or touch start of thumbnail. Use to trigger video preload. */
  'before-start-playing': [];
}

export interface MediaQueryType {
  isNavigationCollapsed: boolean;
}
