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
import { computed, ref, useAttrs } from 'vue';
import { classNames } from '@/utilities/css';
import { useWithinContent } from '@/use/useContent';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/Banner/Banner.module.scss';
import type { BannerProps } from './types';

const slot = defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<BannerProps>(), {
  tone: 'info',
});

const withinContentContainer = useWithinContent();
const attrs = useAttrs();

defineExpose({
  focus: () => {
    if (wrapperRef.value) {
      wrapperRef.value.focus();
      shouldShowFocus.value = true;
    }
  },
});

const wrapperRef = ref<HTMLInputElement | null>(null);
const shouldShowFocus = ref<boolean>(false);

const listeners = computed(() => {
  const event = 'dismiss';
  const eventBindings: Record<string, unknown> = {};

  const eventName = 'onDismiss';

  if (attrs[eventName]) {
    eventBindings[event] = attrs[eventName];
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

const className = computed(() =>
  classNames(
    styles.Banner,
    shouldShowFocus.value && styles.keyFocused,
    withinContentContainer.value ? styles.withinContentContainer : styles.withinPage,
  ),
);
</script>
