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
    :class="styles.Content",
    :style="contentStyles",
    :aria-label="ariaLabel",
  )
    slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import styles from '@/classes/Tooltip-TooltipOverlay.json';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/utils';
import { PositionedOverlay } from '@/components/PositionedOverlay';
import { UseI18n } from '@/use';

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

const i18n = UseI18n();

const contentStyles = ref<any>({});

const ariaLabel = computed(() => {
  return props.accessibilityLabel
    ? i18n.translate('Polaris.TooltipOverlay.accessibilityLabel', {
      label: props.accessibilityLabel,
    })
    : undefined
});

const changeContentStyles = (value: Record<string, unknown>) => {
  contentStyles.value = { minHeight: `${value.desiredHeight}px` };
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Tooltip/components/TooltipOverlay/TooltipOverlay.scss';
</style>
