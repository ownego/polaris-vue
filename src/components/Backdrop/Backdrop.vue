<template lang="pug">
div(:class="className")
  ScrollLock
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Backdrop.json';
import { ScrollLock } from '../ScrollLock';

interface Props {
  belowNavigation?: boolean;
  transparent?: boolean;
}

const props = defineProps<Props>();

const className = computed(() => {
  return classNames(
    styles.Backdrop,
    props.belowNavigation && styles.belowNavigation,
    props.transparent && styles.transparent,
  );
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Backdrop/Backdrop.scss';
</style>
