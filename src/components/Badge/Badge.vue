<template lang="pug">
</template>

<script setup lang="ts">
import { computed, inject, useCssModule } from 'vue';
import { Text, Icon } from '@/components';
import { classNames, variationName } from '@/utilities/css';
import { getDefaultAccessibilityLabel } from './utils';
import type { Tone, Progress, Size } from './types';
import type { IconSource, VueNode } from '@/utilities/types';
import CompleteSvg from '@/assets/Badge/complete.svg';
import PartiallySvg from '@/assets/Badge/partially.svg';
import IncompleteSvg from '@/assets/Badge/incomplete.svg'

const DEFAULT_SIZE: Size = 'medium';
interface NonMutuallyExclusiveProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Colors and labels the badge with the given tone. */
  tone?: Tone;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /** Icon to display to the left of the badge’s content. */
  icon?: IconSource;
  /**
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  toneAndProgressLabelOverride?: string;
}

export type BadgeProps = NonMutuallyExclusiveProps &
  (
    | {progress?: Progress; icon?: undefined}
    | {icon?: IconSource; progress?: undefined}
  );

const styles = useCssModule();

const props = withDefaults(defineProps<BadgeProps>(), {
  size: DEFAULT_SIZE,
});
defineSlots<{
  default: (_: VueNode) => any;
}>();

const withinFilter = inject<boolean>('within-filter', false);

const className = computed(() => {
  return classNames(
    styles.Badge,
    props.tone && styles[variationName('tone', props.tone)],
    props.size && props.size !== DEFAULT_SIZE && styles[variationName('size', props.size)],
    withinFilter && styles.withinFilter,
  );
});
const accessibilityLabel = computed(() => {
  return props.toneAndProgressLabelOverride
    ? props.toneAndProgressLabelOverride
    : getDefaultAccessibilityLabel(props.progress, props.tone);
});
const progressIconMap = computed(() => {
  return {
    complete: CompleteSvg,
    partially: PartiallySvg,
    incomplete: IncompleteSvg,
  }
});
</script>

<style lang="scss" module>
@import '@polaris/components/Badge/Badge.scss';
</style>

