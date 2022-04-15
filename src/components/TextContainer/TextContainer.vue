<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/TextContainer.json';

type Spacing = 'tight' | 'loose';

interface Props {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
}

const props = defineProps<Props>();

const spacingClassName = computed(() => props.spacing
  && styles[variationName('spacing', props.spacing) as keyof typeof styles]);
const className = computed(() => classNames(styles.TextContainer, spacingClassName.value));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TextContainer/TextContainer.scss';
</style>
