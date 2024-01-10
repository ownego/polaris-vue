<template lang="pug">
span(:class="className")
  span(
    v-if="progress && !icon",
    :class="styles.Icon",
  )
    Icon(
      :source="progressIconMap[progress]",
      :accessibility-label="accessibilityLabel",
    )
  Text(
    v-if="Boolean(accessibilityLabel)",
    as="span",
    visually-hidden,
  ) {{ accessibilityLabel }}
  span(
    v-if="icon",
    :class="styles.Icon",
  )
    Icon(:source="icon")
  Text(
    v-if="hasSlot(slots.default)",
    as="span",
    variant="bodySm",
    :font-weight="tone === 'new' ? 'medium' : undefined",
  )
    slot
</template>

<script setup lang="ts">
import { computed, inject, useCssModule } from 'vue';
import { Text, Icon } from '@/components';
import { classNames, variationName } from '@/utilities/css';
import { getDefaultAccessibilityLabel } from './utils';
import { useHasSlot } from '@/use/useHasSlot';
import type { Tone, Progress, Size } from './types';
import type { IconSource, VueNode } from '@/utilities/types';
import CompleteSvg from '@/assets/Badge/complete.svg';
import PartiallySvg from '@/assets/Badge/partially.svg';
import IncompleteSvg from '@/assets/Badge/incomplete.svg'

const DEFAULT_SIZE: Size = 'medium';
interface NonMutuallyExclusiveProps {
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
const { hasSlot } = useHasSlot();

const props = withDefaults(defineProps<BadgeProps>(), {
  size: DEFAULT_SIZE,
});
const slots = defineSlots<{
  /** The content to display inside the badge. */
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
const progressIconMap = computed<any>(() => {
  return {
    complete: CompleteSvg,
    partiallyComplete: PartiallySvg,
    incomplete: IncompleteSvg,
  }
});
</script>

<style lang="scss" module>
@import '@polaris/components/Badge/Badge.scss';
</style>

