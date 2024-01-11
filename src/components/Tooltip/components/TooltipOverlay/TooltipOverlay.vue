<template lang="pug">
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import useI18n from '@/use/useI18n';
import { classNames } from '@/utilities/css';
import { PositionedOverlay } from '@/components';
import type { PositionedOverlayProps } from '@/components/PositionedOverlay/PositionedOverlay.vue';
import type { Width, Padding, BorderRadius } from '../../types';

interface TooltipOverlayProps {
  id: string;
  active: boolean;
  preventInteraction?: PositionedOverlayProps['preventInteraction'];
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  activator: HTMLElement;
  accessibilityLabel?: string;
  width?: Width;
  padding?: Padding;
  borderRadius?: BorderRadius;
  zIndexOverride?: number;
  onClose(): void;
  instant?: boolean;
}

const i18n = useI18n();
const styles = useCssModule();

const props = withDefaults(defineProps<TooltipOverlayProps>(), {
  preferredPosition: 'above',
});

const containerClassName = computed(() => classNames(
  styles.TooltipOverlay,
  props.measuring && styles.measuring,
  
));
</script>

<style lang="scss" module>
@import '@polaris/components/Tooltip/components/TooltipOverlay/TooltipOverlay.scss';
</style>
