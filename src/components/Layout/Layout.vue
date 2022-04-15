<template lang="pug">
div(:class="styles.Layout")
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script setup lang="ts">
import styles from '@/classes/Layout.json';
import { Section } from './components';

interface Props {
  /** Automatically adds sections to layout */
  sectioned?: boolean;
}

const props = defineProps<Props>();
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Layout/Layout.scss';
</style>
