<template lang="pug">
CustomProperties(color-scheme="dark")
  div(:class="className")
    KeypressListener(
      :keyCode="Key.Escape",
      :handler="onDismiss",
    )
    | {{ content }}
    slot
    div(
      v-if="action",
      :class="styles.Action",
    )
      PButton(
        plain,
        monochrome,
        @click="action.onAction",
      )
        | {{ action.content }}
    button(
      type="button",
      :class="styles.CloseButton",
      @click="onDismiss",
    )
      Icon(:source="MobileCancelMajor")
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Frame-Toast.json';
import { KeypressListener, Button as PButton, CustomProperties, Icon } from '@/components';
import type { Action } from '@/utilities/type';
import { Key } from '@/components/KeypressListener/utils';
import MobileCancelMajor from '@icons/MobileCancelMajor.svg';

const DEFAULT_TOAST_DURATION = 5000;

const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;

interface ToastProps {
  /** The content that should appear in the toast message */
  content: string;
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration?: number;
  /** Display an error toast. */
  error?: boolean;
  /** Adds an action next to the message */
  action?: Action;
}

const props = defineProps<ToastProps>();

const emits = defineEmits<{
  (e: 'dismiss'): void;
}>();

const timer = ref();

const className = computed(() => classNames(styles.Toast, props.error && styles.error));

onMounted(() => {
  let timeoutDuration = props.duration || DEFAULT_TOAST_DURATION;

  if (props.action && !props.duration) {
    timeoutDuration = DEFAULT_TOAST_DURATION_WITH_ACTION;
  } else if (
    props.action &&
    props.duration &&
    props.duration < DEFAULT_TOAST_DURATION_WITH_ACTION
  ) {
    // eslint-disable-next-line no-console
    console.log(
      'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
    );
  }

  timer.value = setTimeout(onDismiss, timeoutDuration);
});

onBeforeUnmount(() => {
  clearTimeout(timer.value);
});

const onDismiss = () => {
  emits('dismiss');
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/Frame/components/Toast/Toast.scss';
</style>
