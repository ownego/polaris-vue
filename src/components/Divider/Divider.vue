<template lang="pug">
hr(
  :class="styles.Divider",
  :style="{ borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}` }",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {
  BorderWidthScale,
  ColorBorderAlias,
} from '@shopify/polaris-tokens';
import styles from '@polaris/components/Divider/Divider.module.scss';

export interface DividerProps {
  /**
   * Divider border color
   * @default 'border-secondary'
   */
  borderColor?: ColorBorderAlias | 'transparent';
  /**
   * Divider border width
   * @default '025'
   */
  borderWidth?: BorderWidthScale;
}

const props = withDefaults(defineProps<DividerProps>(), {
  borderColor: 'border-secondary',
  borderWidth: '025',
});

const borderColorValue = computed(() =>
  props.borderColor === 'transparent'
    ? props.borderColor
    : `var(--p-color-${props.borderColor})`,
);
</script>
