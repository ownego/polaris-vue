<template lang="pug">
div(:class="className")
  Box(
    as="section",
    :padding="flush ? '0' : '400'",
    v-bind="additionalAttrs",
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Box } from '@/components';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Modal/components/Section/Section.module.scss';

export interface SectionProps {
  flush?: boolean;
  subdued?: boolean;
  titleHidden?: boolean;
}

const props = defineProps<SectionProps>();

const className = computed(() => classNames(
  styles.Section,
  props.titleHidden && styles.titleHidden,
));

const additionalAttrs = computed(() => {
  const attrs: Record<string, string> = {};

  if (props.titleHidden) {
    attrs['padding-inline-end'] = '0';
  }

  if (props.subdued) {
    attrs['background'] = 'bg-surface-tertiary';
  }

  return attrs;
}); 
</script>
