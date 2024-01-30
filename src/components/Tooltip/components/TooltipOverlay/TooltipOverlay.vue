<template lang="pug">
PositionedOverlay(
  v-if="active",
  ref="overlayRef",
  :active="active",
  :activator="activator",
  :preferred-position="preferredPosition",
  :prevent-interaction="preventInteraction",
  :z-index-override="zIndexOverride",
)
  div(
    :style="style",
    :class="containerClassName",
    v-bind="layer.props",
  )
    svg(
      :class="styles.Tail",
      width="19",
      height="11",
      fill="none",
    )
      TailDownPathsVue(v-if="overlayDetails?.positioning === 'above'")
      TailUpPaths(v-else)
    div(
      :id="id",
      role="tooltip",
      :class="contentClassName",
      :style="{ ...contentStyles, ...style }",
      :aria-label="accessibilityLabel && i18n.translate('Polaris.Tooltip.overlayLabel', { label: accessibilityLabel })",
    )
      slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { layer } from '@polaris/components/shared';
import useI18n from '@/use/useI18n';
import { classNames } from '@/utilities/css';
import { PositionedOverlay } from '@/components';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/PositionedOverlay.vue';
import TailDownPathsVue from './TailDownPaths.vue';
import TailUpPaths from './TailUpPaths.vue';
import type { TooltipOverlayBaseProps } from './utils';
import styles from '@polaris/components/Tooltip/components/TooltipOverlay/TooltipOverlay.module.scss';

export type TooltipOverlayProps = TooltipOverlayBaseProps & {
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
}

const i18n = useI18n();

const props = withDefaults(defineProps<TooltipOverlayProps>(), {
  preferredPosition: 'above',
});

const overlayRef = ref<InstanceType<typeof PositionedOverlay> | null>(null);

// Computed
const overlayDetails = computed(() => overlayRef.value?.overlayDetails);
const containerClassName = computed(() => classNames(
  styles.TooltipOverlay,
  overlayDetails.value?.measuring && styles.measuring,
  !overlayDetails.value?.measuring && styles.measured,
  props.instant && styles.instant,
  overlayDetails.value?.positioning === 'above' && styles.positionedAbove,
));
const contentClassName = computed(() => classNames(
  styles.Content,
  props.width && styles[props.width],
));
const contentStyles = computed(() => {
  return overlayDetails.value?.measuring
    ? undefined
    : { minHeight: overlayDetails.value?.desiredHeight };
});
const style = computed(() => {
  return {
    '--pc-tooltip-chevron-x-pos': `${overlayDetails.value?.chevronOffset}px`,
    '--pc-tooltip-border-radius': props.borderRadius
      ? `var(--p-border-radius-${props.borderRadius})`
      : undefined,
    '--pc-tooltip-padding':
      props.padding && props.padding === 'default'
        ? 'var(--p-space-100) var(--p-space-200)'
        : `var(--p-space-${props.padding})`,
  }
});
</script>
