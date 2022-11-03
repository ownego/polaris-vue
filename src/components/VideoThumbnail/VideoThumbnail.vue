<template lang="pug">
div(:class="styles.ThumbnailContainer")
  div(
    :class="styles.Thumbnail",
    :style="{ backgroundImage: `url(${thumbnailUrl})` }",
  )
  button(
    type="button",
    :class="styles.PlayButton",
    :aria-label="buttonLabel",
    @click="$emit('click')",
    @mouseenter="$emit('before-start-playing')",
    @focus="$emit('before-start-playing')",
    @touchstart="$emit('before-start-playing')",
  )
    p(v-if="videoLength", :class="styles.Timestamp")
      Stack(alignment="center", spacing="extraTight")
        span(:class="styles.PlayIcon")
          Icon(:source="PlayMinor")
        Text(
          :variant="isNavigationCollapsed ? 'bodyLg' : 'bodyMd'",
          as="p",
          font-weight="semibold",
        ) {{ secondsToTimestamp(videoLength) }}
  div(v-if="showVideoProgress", :class="styles.Progress")
    progress(
      :class="styles.ProgressBar",
      :value="progressValuePercents",
      max="100",
    )
    div(
      :class="styles.Indicator",
      :style="{ transform: `scaleX(${progressValue})`}",
    )
      span(:class="styles.Label") {{ progressValuePercents }}%
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { classNames } from '@/utilities/css';
import { secondsToTimeComponents, secondsToTimestamp, secondsToDurationTranslationKey } from 'polaris/polaris-react/src/utilities/duration';
import { UseI18n } from '@/use';
import { UseMediaQuery } from '@/utilities/media-query';
import { Icon, Stack, Text } from '@/components';
import PlayMinor from '@icons/PlayMinor.svg';
import styles from '@/classes/VideoThumbnail.json';

interface VideoThumbnailProps {
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

const props = withDefaults(defineProps<VideoThumbnailProps>(), {
  videoLength: 0,
  videoProgress: 0,
  showVideoProgress: false,
});

const i18n = UseI18n();
const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const buttonLabel = computed(() => {
  if (props.accessibilityLabel) {
    return props.accessibilityLabel;
  }

  if (props.videoLength) {
    const { hours, minutes, seconds } = secondsToTimeComponents(props.videoLength);

    const translationKey = i18n.translate(secondsToDurationTranslationKey(props.videoLength), {
      hourCount: hours,
      minuteCount: minutes,
      secondCount: seconds,
    });

    return i18n.translate(
      'Polaris.VideoThumbnail.playButtonA11yLabel.defaultWithDuration',
      { duration: translationKey },
    );
  }

  return i18n.translate('Polaris.VideoThumbnail.playButtonA11yLabel.default');
});

const progressValue = computed(() => calculateProgress(props.videoLength, props.videoProgress));
const progressValuePercents = computed(() => Math.round(progressValue.value * 100));

function calculateProgress(videoLength: number, videoProgress: number) {
  // if (videoProgress > videoLength && process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line no-console
  //   console.warn(
  //     'Value passed to the video progress should not exceed video length. Resetting progress to 100%.',
  //   );
  // }

  if (videoProgress > 0 && videoLength > 0) {
    const progress = parseFloat((videoProgress / videoLength).toFixed(2));
    return progress > 1 ? 1 : progress;
  }

  return 0;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/VideoThumbnail/VideoThumbnail.scss';
</style>
