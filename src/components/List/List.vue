<template lang="pug">
component(
  :is="element",
  :class="className",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/List.json';

/**
 * Setup
 */
type Type = 'bullet' | 'number';

interface Props {
  /**
   * Type of list to display
   * @values bullet | number
   * @default bullet
   */
  type?: Type;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'bullet',
});

/**
 * Computed
 */
const className = computed(() => {
  const variation = variationName('type', props.type) as keyof typeof styles;
  return classNames(
    styles.List,
    props.type && styles[variation],
  );
})

const element = props.type === 'bullet' ? 'ul' : 'ol';
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/List/List.scss';
</style>
