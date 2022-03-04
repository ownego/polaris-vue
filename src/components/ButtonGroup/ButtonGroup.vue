<template lang="pug">
div(
  :class="className",
  :data-buttongroup-segmented="segmented",
  :data-buttongroup-connected-top="connectedTop",
  :data-buttongroup-full-width="fullWidth",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ButtonGroup.json';

type Spacing = 'extraTight' | 'tight' | 'loose';

interface Props {
  /** Determines the space between button group items */
  spacing?: Spacing;
  /** Join buttons as segmented group */
  segmented?: boolean;
  /** Buttons will stretch/shrink to occupy the full width */
  fullWidth?: boolean;
  /** Remove top left and right border radius */
  connectedTop?: boolean;
}

const props = defineProps<Props>()

const className = computed(() => {
  return classNames(
    styles.ButtonGroup,
    props.spacing && styles[props.spacing],
    props.segmented && styles.segmented,
    props.fullWidth && styles.fullWidth,
  );
})
</script>

<style lang="scss">
@import 'polaris-react/src/components/ButtonGroup/ButtonGroup.scss';
</style>
