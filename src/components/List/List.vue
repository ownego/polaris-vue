<template lang="pug">
component(
  :is="listElm"
  :class="className"
)
  slot
</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/List/List.module.css';

type Type = 'bullet' | 'number';

type Spacing = 'extraTight' | 'loose';

interface ListProps {
  /**
   * Determines the space between list items
   * @default 'loose'
   */
  gap?: Spacing;
  /**
   * Type of list to display
   * @default 'bullet'
   */
  type?: Type;
}

interface ListSlots {
  /** List item elements */
  default?: (_?: VueNode) => VNode[];
}

const props = withDefaults(defineProps<ListProps>(),{
  gap: 'loose',
  type: 'bullet',
});

const slots = defineSlots<ListSlots>();

const className = computed(() => classNames(
  styles.List,
  props.gap && styles[variationName('spacing', props.gap)],
  props.type && styles[variationName('type', props.type)],
));

const listElm = computed(() => props.type === 'bullet' ? 'ul' : 'ol');
</script>
