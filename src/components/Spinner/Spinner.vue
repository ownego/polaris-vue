<template lang="pug">
span(:class="className")
  SpinnerIconLarge(v-if="size === 'large'")
  SpinnerIconSmall(v-else)
span(v-bind="spanAttributes")
  Text(
    v-if="isAfterInitialMount || !hasFocusableParent",
    visually-hidden,
    as="span",
  ) {{ accessibilityLabel }}
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Text } from '@/components';
import SpinnerIconLarge from '@/assets/spinner-large.svg';
import SpinnerIconSmall from '@/assets/spinner-small.svg';
import styles from '@polaris/components/Spinner/Spinner.module.css';

type Size = 'small' | 'large';

export interface SpinnerProps {
  /**
   * Size of spinner
   * @default 'large'
   */
  size?: Size;
  /** Accessible label for the spinner */
  accessibilityLabel?: string;
  /** Allows the component to apply the correct accessibility roles based on focus */
  hasFocusableParent?: boolean;
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'large',
});

/**
 * useIsAfterInitialMount will trigger a re-render to provide
 * you with an updated value. Using this you enhance server-side
 * code that can only run on the client.
 * @returns MutableRefObject<T> - Returns a ref object with the
 * results from invoking initial value
 * @example
 * function ComponentExample({children}) {
 *  const isMounted = useIsAfterInitialMount();
 *  const content = isMounted ? children : null;
 *
 *  return <>{content}</>;
 * }
 */
const isAfterInitialMount = ref(false);

const spanAttributes = computed(() => {
  return {
    ...(!props.hasFocusableParent && { role: 'status' }),
  };
});
const className = computed(() => {
  return classNames(
    styles.Spinner,
    props.size && styles[variationName('size', props.size)],
  );
});

onMounted(() => {
  isAfterInitialMount.value = true;
});
</script>
