<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/ContentBlock.json';

type Width = 'md' | 'lg';

interface Props {
  /** Adjust maximum width of container */
  width: Width;
}

const props = defineProps<Props>();

const className = computed(() => classNames(styles.ContentBlock, styles[props.width]));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ContentBlock/ContentBlock.scss';
</style>
