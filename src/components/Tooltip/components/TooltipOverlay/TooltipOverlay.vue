<template lang="pug">
PositionedOverlay(
  v-if="active",
  layout="tooltip",
  :active="active",
  :activator="activator",
  :preferredPosition="preferredPosition",
  :preventInteraction="preventInteraction",
  @change-content-styles="changeContentStyles",
)
  div(
    :id="id",
    role="tooltip",
    :className="styles.Content",
    :style="contentStyles",
    :aria-label="ariaLabel",
  )
    slot
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import styles from '@/classes/Tooltip-TooltipOverlay.json';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/utils';
import { PositionedOverlay } from '@/components/PositionedOverlay';

interface Props {
  id: string;
  active: boolean;
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  activator: HTMLElement;
  accessibilityLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  preferredPosition: 'below',
});

const lang = inject('lang') as Record<string, any>;

const contentStyles = ref<Record<string, unknown>>({});

const ariaLabel = computed(() => {
  return props.accessibilityLabel
    ? lang.Polaris.TooltipOverlay.accessibilityLabel.replace(
      '{label}',
      props.accessibilityLabel,
    )
    : undefined
});

const changeContentStyles = (value: Record<string, unknown>) => {
  contentStyles.value = { minHeight: `${value.desiredHeight}px` };
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/Tooltip/components/TooltipOverlay/TooltipOverlay.scss';
</style>
