<template lang="pug">
dl(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/DescriptionList/DescriptionList.module.scss';

interface DescriptionListProps {
  /** Determines the spacing between list items */
  gap?: 'tight' | 'loose';
}

const prop = withDefaults(defineProps<DescriptionListProps>(), {
  gap: 'loose',
});

const className = computed(() => classNames(
  styles.DescriptionList,
  prop.gap === 'tight' && styles.spacingTight,
));
</script>
