<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Layout/Layout.module.css';

export type SectionProps = {
  variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
}

const props = defineProps<SectionProps>();

const className = computed(() => classNames(styles.Section, styles[`Section-${props.variant}`]));
</script>
