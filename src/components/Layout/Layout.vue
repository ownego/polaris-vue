<template lang="pug">
div(:class="styles.Layout")
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import type { VueNode } from '@/utilities/types';
import Section from './components/Section/Section.vue';

export type LayoutProps = {
  /** Automatically adds sections to layout. */
  sectioned?: boolean;
}

defineProps<LayoutProps>();

defineSlots<{
  /** The content to display inside the layout. */
  default: (_: VueNode) => any;
}>();

const styles = useCssModule();
</script>

<style lang="scss" module>
@import '@polaris/components/Layout/Layout.scss';
</style>
