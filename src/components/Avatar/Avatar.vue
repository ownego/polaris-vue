<template lang="pug">
span(
  :aria-label="label",
  role="img",
  :class="className",
)
  span(v-if="!hasImage", :class="styles.Initials")
    svg(:class="styles.Svg", viewBox="0 0 40 40")
      path(v-if="customer || !initials", fill="currentColor", :d="svgPath")
      text(
        v-else,
        x="50%",
        y="50%",
        :dy="verticalOffset",
        fill="currentColor",
        font-size="20",
        text-anchor="middle",
      ) {{ initials }}
  Image(
    v-if="source && status !== Status.Errored",
    :class="styles.Image",
    :source="source",
    alt="",
    role="presentation",
    @load="handleLoad",
    @error="handleError",
  )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Avatar.json';
import { styleClass } from './utils';
import { Image } from '../Image';
import type { Size } from './utils';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

interface Props {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image which falls back to initials if the image fails to load */
  source?: string;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

const props = withDefaults(defineProps<Props>(),{
  size: 'medium',
  name: undefined,
  initials: undefined,
  customer: undefined,
  source: undefined,
  accessibilityLabel: undefined,
});

const emit = defineEmits<{ (event: 'error'): void }>();

const status = ref<Status>(Status.Pending);

const svgPath = 'M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z';

// Use `dominant-baseline: central` instead of `dy` when Edge supports it.
const verticalOffset = '0.35em';

const hasImage = computed(() => {
  return props.source && status.value !== Status.Errored;
});

const className =  computed(() => {
  const size = variationName('size', props.size) as keyof typeof styles;
  const style = variationName('style', styleClass(props.name || props.initials)) as keyof typeof styles;

  return classNames(
    styles.Avatar,
    size && styles[size],
    !props.customer && styles[style],
    (hasImage.value || (props.initials && props.initials.length === 0))
    && status.value !== Status.Loaded
    && styles.hidden,
    hasImage.value && styles.hasImage,
  );
});

const label = computed(() => {
  if (props.accessibilityLabel) {return props.accessibilityLabel;}
  if (props.name) {return props.name;}
  if (props.initials) {
    const splitInitials = props.initials.split('').join(' ');
    return `Avatar with initials ${splitInitials}`;
  }
  return 'Avatar';
});

const handleLoad = () => {
  status.value = Status.Loaded;
}

const handleError = () => {
  status.value = Status.Errored;
  emit('error');
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Avatar/Avatar.scss';
</style>
