<template lang="pug">
div(
  ref="wrapperRef",
  :class="className",
  :tabIndex="0",
  :role="tone === 'warning' || tone === 'critical' ? 'alert' : 'status'",
  :aria-live="stopAnnouncements ? 'off' : 'polite'",
  @mouseup="handleMouseUp",
  @keyup="handleKeyUp",
  @blur="handleBlur",
)
  BannerLayout(
    v-bind="{ ...props }",
    v-on="listeners",
  )
    slot
</template>

<script setup lang="ts">
import { computed, ref, provide, getCurrentInstance } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/Banner/Banner.module.css';
import BannerLayout from './components/BannerLayout.vue';
import type { BannerProps } from './types';
import useWithinContentContext from './context';

defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<BannerProps>(), {
  tone: 'info',
});

const currentInstance = getCurrentInstance();

defineExpose({
  focus: () => {
    if (wrapperRef.value) {
      wrapperRef.value.focus();
      shouldShowFocus.value = true;
    }
  },
});

const withinContentContainer = useWithinContentContext();

const wrapperRef = ref<HTMLInputElement | null>(null);
const shouldShowFocus = ref<boolean>(false);

const listeners = computed(() => {
  const eventBindings: Record<string, unknown> = {};

  if (currentInstance?.vnode.props?.onDismiss) {
    eventBindings['dismiss'] = currentInstance.vnode.props.onDismiss;
  }

  return eventBindings;
});

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.target === wrapperRef.value) {
    shouldShowFocus.value = true;
  }
};

const handleBlur = () => shouldShowFocus.value = false;

const handleMouseUp = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDivElement;
  target.blur();
  shouldShowFocus.value = false;
};

const className = computed(() => classNames(
  styles.Banner,
  shouldShowFocus.value && styles.keyFocused,
  withinContentContainer ? styles.withinContentContainer : styles.withinPage,
));

provide('banner-context', false);
</script>
