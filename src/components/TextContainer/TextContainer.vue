<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/TextContainer/TextContainer.module.css';

type Spacing = 'tight' | 'loose';

export interface TextContainerProps {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
}

defineSlots<{
  /** The content to render in the text container. */
  default: (_?: VueNode) => any;
}>();

const props = defineProps<TextContainerProps>();

const className = computed(() =>
  classNames(
    styles.TextContainer,
    props.spacing && styles[variationName('spacing', props.spacing)],
  ),
);
</script>
