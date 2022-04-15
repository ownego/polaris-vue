<template lang="pug">
div
  span(:class="className")
    SpinnerIconLarge(v-if="size === 'large'")
    SpinnerIconSmall(v-else)
  span(v-bind="spanAttributes")
    VisuallyHidden
      span {{ accessibilityLabel }}
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import SpinnerIconLarge from '@/assets/spinner-large.svg';
import SpinnerIconSmall from '@/assets/spinner-small.svg';
import styles from '@/classes/Spinner.json';
import { VisuallyHidden } from '../VisuallyHidden';

type Size = 'small' | 'large';

const props = defineProps({
  /**
   * Size of the spinner
   * @values small | large
   */
  size: {
    type: String as () => Size,
    default: 'large',
  },

  /**
   * Accessible label for the spinner
   */
  accessibilityLabel: {
    type: String,
    default: null,
  },

  /**
   * Allows the component to apply the correct accessibility roles based on focus
   */
  hasFocusableParent: {
    type: Boolean,
  },
});

const spanAttributes = ref({
  ...(!props.hasFocusableParent && { role: 'status' }),
});

const className = computed(() => {
  const variation = variationName('size', props.size) as keyof typeof styles;

  return classNames(styles.Spinner, props.size && styles[variation]);
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Spinner/Spinner.scss';
</style>
