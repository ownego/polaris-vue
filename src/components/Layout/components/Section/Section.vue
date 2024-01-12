<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { classNames } from '@/utilities/css';

export type SectionProps = {
  variant?: 'oneHalf' | 'oneThird' | 'fullWidth';
}

const props = defineProps<SectionProps>();

const styles = useCssModule();

const className = computed(() => classNames(styles.Section, styles[`Section-${props.variant}`]));
</script>

<style lang="scss" module>
@import '@polaris/components/Layout/Layout.module.scss';
</style>
