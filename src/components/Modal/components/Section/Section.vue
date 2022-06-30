<template lang="pug">
section(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Modal-Section.json';

interface Props {
  flush?: boolean;
  subdued?: boolean;
  titleHidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  titleHidden: false,
});

const className = computed(() => {
  return classNames(
    styles.Section,
    props.flush && styles.flush,
    props.subdued && styles.subdued,
    props.titleHidden && styles.titleHidden,
  );
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/components/Section/Section.scss';
</style>
