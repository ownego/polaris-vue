<template lang="pug">
span(:class="className")
  span(v-if="progress && !icon", :class="styles.PipContainer")
    Pip(
      :progress="progress",
      :status="status",
      :accessibilityLabelOverride="accessibilityLabel",
    )
  template(v-if="hasAccessibilityLabel")
    VisuallyHidden {{ accessibilityLabel }}
  span(v-if="icon", :class="styles.Icon")
    Icon(:source="icon")
  span(v-if="$slots.default")
    slot
</template>

<script setup lang="ts">
import { inject, ref, computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Badge.json';
import type { IconSource } from '@/utilities/type';
import { Icon } from '../Icon';
import { Pip } from './components/Pip';
import { VisuallyHidden } from '../VisuallyHidden';
import { getDefaultAccessibilityLabel } from './utils';
import type { Progress, Size, Status } from './utils';

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
  // props.icon && styles.icon,
  props.size && props.size !== DEFAULT_SIZE && styles[variationName('size', props.size) as keyof typeof styles],
  withinFilter && styles.withinFilter,
));

const hasAccessibilityLabel= computed(() => props.statusAndProgressLabelOverride
  || statusLabel.value
  || progressLabel.value,
);
const accessibilityLabel = computed(() => props.statusAndProgressLabelOverride
  ? props.statusAndProgressLabelOverride
  : getDefaultAccessibilityLabel(props.progress, props.status),
);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Badge/Badge.scss';
</style>
