<template lang="pug">
component(
  :is="as",
  :className="styles.ShadowBevel",
  :style="style",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getResponsiveValue } from '@/utilities/css';
import type { ResponsiveProp } from '@/utilities/css';
import type { ShadowBevelProps } from './types';
import styles from '@polaris/components/ShadowBevel/ShadowBevel.module.scss';

const props = withDefaults(defineProps<ShadowBevelProps>(), {
  as: 'div',
  zIndex: '0',
  bevel: true,
});

const style = computed(() => ({
  '--pc-shadow-bevel-z-index': props.zIndex,
  ...getResponsiveValue(
    'shadow-bevel',
    'content',
    mapResponsiveProp(props.bevel, (bevel) => (bevel ? '""' : 'none')),
  ),
  ...getResponsiveValue(
    'shadow-bevel',
    'box-shadow',
    mapResponsiveProp(props.bevel, (bevel) =>
      bevel ? `var(--p-shadow-${props.boxShadow})` : 'none',
    ),
  ),
  ...getResponsiveValue(
    'shadow-bevel',
    'border-radius',
    mapResponsiveProp(props.bevel, (bevel) =>
      bevel
        ? `var(--p-border-radius-${props.borderRadius})`
        : 'var(--p-border-radius-0)',
    ),
  ),
}));

function mapResponsiveProp(
  responsiveProp: ResponsiveProp<boolean>,
  callback: (value: boolean) => string,
): ResponsiveProp<string> {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [
      breakpointsAlias,
      callback(value),
    ]),
  );
}
</script>
