<template lang="pug">
div(:class="styles.ThumbnailContainer")
  div(
    :class="styles.Thumbnail",
    :style="{ backgroundImage: `url(${thumbnailUrl})` }",
  )
  Button(
    type="button",
    :class="styles.PlayButton",
    :aria-label="buttonLabel",
    @click="emits('click')",
    @mouseenter="emits('before-start-playing')",
    @focus="emits('before-start-playing')",
    @touchstart="emits('before-start-playing')",
  )
    div(
      v-if="videoLength",
      :class="styles.Timestamp",
    )
      LegacyStack(alignment="center", spacing="extraTight")
        span(:class="styles.PlayIcon")
          Icon(:source="PlayIcon")
        Text(
          as="p",
          fontWeight="semibold",
          :variant="isNavigationCollapsed ? 'bodyLg' : 'bodyMd'",
        ) {{ secondsToTimestamp(videoLength) }}
  div(
    v-if="showVideoProgress",
    :class="styles.Progress",
  )
    progress(
      max="100",
      :class="styles.ProgressBar",
      :value="progressValuePercents",
    )
    div(
      :class="styles.Indicator",
      :style="{ transform: `scaleX(${progressValue})` }",
    )
      span(:class="styles.Label") {{ progressValuePercents + '%' }}
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import {
  secondsToTimeComponents,
  secondsToDurationTranslationKey,
  secondsToTimestamp,
} from '@polaris/utilities/duration';
import PlayIcon from '@icons/PlayIcon.svg';
import useI18n from '@/use/useI18n';
import styles from '@polaris/components/VideoThumbnail/VideoThumbnail.module.css';
import type {
  VideoThumbnailProps,
  VideoThumbnailEvents,
  MediaQueryType,
} from './types';

const props = withDefaults(defineProps<VideoThumbnailProps>(), {
  videoLength: 0,
  videoProgress: 0,
  showVideoProgress: false,
});

const emits = defineEmits<VideoThumbnailEvents>();

const i18n = useI18n();

const mediaQuery = inject<MediaQueryType | undefined>('media-query', undefined);

const isNavigationCollapsed = computed(() => mediaQuery?.isNavigationCollapsed || false);

const buttonLabel = computed(() => {
  if (props.accessibilityLabel) {
    return props.accessibilityLabel;
  } else if (props.videoLength) {
    const { hours, minutes, seconds } = secondsToTimeComponents(props.videoLength);

    return i18n.translate(
      'Polaris.VideoThumbnail.playButtonA11yLabel.defaultWithDuration',
      {
        duration: i18n.translate(secondsToDurationTranslationKey(props.videoLength), {
          hourCount: hours,
          minuteCount: minutes,
          secondCount: seconds,
        }),
      },
    );
  }

  return i18n.translate(
    'Polaris.VideoThumbnail.playButtonA11yLabel.default',
  );
});

const progressValue = computed(() => {
  // if (props.videoProgress > props.videoLength && process.env.NODE_ENV === 'development') {
  //   console.warn(
  //     'Value passed to the video progress should not exceed video length. Resetting progress to 100%.',
  //   );
  // }

  if (props.videoProgress > 0 && props.videoLength > 0) {
    const progress = parseFloat((props.videoProgress / props.videoLength).toFixed(2));
    return progress > 1 ? 1 : progress;
  }

  return 0;
});

const progressValuePercents = computed(() => Math.round(progressValue.value * 100));
</script>
