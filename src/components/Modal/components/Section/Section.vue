<template lang="pug">
section(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Modal-Section.json';

interface Props {
  flush?: boolean;
  subdued?: boolean
}

const props = defineProps<Props>();

const className = computed(() => {
  return classNames(
    styles.Section,
    props.flush && styles.flush,
    props.subdued && styles.subdued,
  );
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Modal/components/Section/Section.scss';
</style>
