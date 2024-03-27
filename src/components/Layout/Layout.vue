<template lang="pug">
div(:class="styles.Layout")
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import Section from './components/Section/Section.vue';
import styles from '@polaris/components/Layout/Layout.module.css';

export type LayoutProps = {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
}

defineProps<LayoutProps>();

defineSlots<{
  /** The content to display inside the layout. */
  default: (_: VueNode) => any;
}>();
</script>
