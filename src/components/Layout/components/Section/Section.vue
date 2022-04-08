<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Layout.json';

interface SectionProps {
  secondary?: boolean;
  fullWidth?: boolean;
  oneHalf?: boolean;
  oneThird?: boolean;
}

const props = defineProps<SectionProps>();

const className = computed(() => classNames(
  styles.Section,
  props.secondary && styles['Section-secondary'],
  props.fullWidth && styles['Section-fullWidth'],
  props.oneHalf && styles['Section-oneHalf'],
  props.oneThird && styles['Section-oneThird'],
));
</script>
