<template lang="pug">
div(
  :class="className",
  :data-buttongroup-variant="variant",
  :data-buttongroup-connected-top="connectedTop",
  :data-buttongroup-full-width="fullWidth",
  :data-buttongroup-no-wrap="noWrap",
)
  Item(
    v-for="item, index in slotsElms",
    :key="index",
    :button-elm="item",
  )
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { useExtractFragment } from '@/use/useExtractFragment';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { Item } from './components';
import type { ButtonGroupProps } from './types';

const slots = defineSlots<{
  /** Button components */
  default: (_?: VueNode) => any;
}>();

const styles = useCssModule();
const { slotsElms } = useExtractFragment(slots.default);

const props = defineProps<ButtonGroupProps>();

const className = computed(() => classNames(
  styles.ButtonGroup,
  props.gap && styles[props.gap],
  props.variant && styles[variationName('variant', props.variant)],
  props.fullWidth && styles.fullWidth,
  props.noWrap && styles.noWrap,
));
</script>

<style lang="scss" module>
@import '@polaris/components/ButtonGroup/ButtonGroup.scss';
</style>
