<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/TextContainer.json';

type Spacing = 'tight' | 'loose';

interface Props {
  /** The amount of vertical spacing children will get between them */
  spacing?: Spacing;
}

const props = defineProps<Props>();

const spacingClassName = props.spacing
    && styles[variationName('TextContainer', props.spacing) as keyof typeof styles];
const className = classNames(styles.TextContainer, spacingClassName);
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextContainer/TextContainer.scss';
</style>
