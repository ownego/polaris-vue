<template lang="pug">
span(:class="className")
  span(v-if="hasIcon", :class="styles.Icon")
    Icon(:source="icon")
  template(v-if="hasAccessibilityLabel")
    span(
      v-if="progressLabel",
      :class="styles.Pip",
    )
      VisuallyHidden {{ accessibilityLabel }}
    VisuallyHidden(v-else) {{ accessibilityLabel }}
  span(v-if="$slots.default")
    slot
</template>

<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Badge.json';
import type { IconSource } from '@/utilities/type';
import { VisuallyHidden } from '../VisuallyHidden';

type Status = 'info' | 'success' | 'attention' | 'warning' | 'critical' | 'new';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type Size = 'small' | 'medium';

interface BadgeProps {
  /** Colors and labels the badge with the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /**
   * Medium or small size.
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  statusAndProgressLabelOverride?: string;
  /** Icon to display to the left of the badge’s content. */
  icon?: IconSource;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const props = withDefaults(defineProps<BadgeProps>(), {
  size: 'medium',
});

const withinFilter =  inject<boolean>('withinFilterContext', false);

const DEFAULT_SIZE = 'medium';

const progressLabel = ref('');
const statusLabel = ref('');

const className = computed(() => classNames(
  styles.Badge,
  props.status && styles[variationName('status', props.status) as keyof typeof styles],
  props.progress && styles[variationName('progress', props.progress) as keyof typeof styles],
  // hasIcon.value && styles.icon,
  props.size && props.size !== DEFAULT_SIZE && styles[variationName('size', props.size) as keyof typeof styles],
  withinFilter && styles.withinFilter,
));

const hasAccessibilityLabel= computed(() => props.statusAndProgressLabelOverride
  || statusLabel.value
  || progressLabel.value,
);
const accessibilityLabel = computed(() => props.statusAndProgressLabelOverride
  || `${statusLabel.value} ${progressLabel.value}`);

const hasIcon = computed(() => {
  return !props.progress && props.icon;
});

onMounted(() => {
  switch (props.progress) {
  case 'incomplete':
    progressLabel.value = 'incomplete';
    break;
  case 'partiallyComplete':
    progressLabel.value = 'partiallyComplete';
    break;
  case 'complete':
    progressLabel.value = 'complete';
    break;
  default:
    break;
  }

  switch (props.status) {
  case 'info':
    statusLabel.value = 'info';
    break;
  case 'success':
    statusLabel.value = 'success';
    break;
  case 'warning':
    statusLabel.value = 'warning';
    break;
  case 'critical':
    statusLabel.value = 'critical';
    break;
  case 'attention':
    statusLabel.value = 'attention';
    break;
  case 'new':
    statusLabel.value = 'new';
    break;
  default:
    break;
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Badge/Badge.scss';
</style>
