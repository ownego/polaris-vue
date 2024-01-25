<template lang="pug">
span(
  :aria-label="label",
  :class="className",
  :role="label ? 'img' : 'presentation'",
)
  span(
    v-if="!hasImage",
    :class="styles.Initials",
  )
    svg(
      :class="styles.Svg",
      view-box="0 0 40 40",
    )
      template(v-if="customer || !initials")
        path(
          fill="none",
          d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z",
          stroke="currentColor",
          :stroke-width="pathSize",
        )
        path(
          fill="none",
          d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z",
          stroke="currentColor",
          stroke-linecap="round"
          stroke-linejoin="round",
          :stroke-width="pathSize",
        )
      text(
        v-else,
        :class="textClassName",
        x="50%",
        y="50%",
        :dy="verticalOffset",
        fill="currentColor",
        text-anchor="middle",
      ) {{ initials }}
  Image(
    v-if="source && status !== Status.Errored",
    :class="imageClassName",
    :source="source",
    alt="",
    role="presentation",
    @load="handleLoad",
    @error="handleError",
  )
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { Image } from '@/components';
import styles from '@polaris/components/Avatar/Avatar.module.scss';
import type { Size, AvatarProps } from './utils';
import { styleClass } from './utils';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

const avatarStrokeWidth: {[S in Size]: string} = {
  xs: '3',
  sm: '2.5',
  md: '2.5',
  lg: '2.5',
  xl: '2',
};

// Use `dominant-baseline: central` instead of `dy` when Edge supports it.
const verticalOffset = '0.35em';

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
});
const emit = defineEmits<{
  'error': [],
}>();

const i18n = useI18n();

const status = ref<Status>(Status.Pending);

const hasImage = computed(() => props.source && status.value !== Status.Errored);
const nameString = computed(() => props.name || props.initials);
const className = computed(() => classNames(
  styles.Avatar,
  props.size && styles[variationName('size', props.size)],
  hasImage.value && status.value === Status.Loaded && styles.imageHasLoaded,
  !props.customer &&
    !hasImage.value &&
    styles[variationName('style', styleClass(nameString.value))],
));
const textClassName = computed(() => classNames(
  styles.Text,
  (props.initials?.length || 0) > 2 && styles.long,
));
const label = computed(() => {
  if (props.accessibilityLabel) {return props.accessibilityLabel;}
  if (props.name) {return props.name;}
  if (props.initials) {
    const splitInitials = props.initials.split('').join(' ');
    return i18n.translate('Polaris.Avatar.labelWithInitials', {
      initials: splitInitials,
    });
  }
  return 'Avatar';
});
const imageClassName = computed(() => classNames(
  styles.Image,
  status.value !== Status.Loaded && styles.hidden,
));
const pathSize = computed(() => avatarStrokeWidth[props.size]);

const handleLoad = () => {
  status.value = Status.Loaded;
};

const handleError = () => {
  status.value = Status.Errored;

  emit('error');
};
</script>
