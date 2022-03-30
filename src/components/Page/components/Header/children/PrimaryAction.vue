<template lang="pug">
div(:class="styles.PrimaryActionWrapper")
  slot(v-if="hasSlot")
  ButtonFrom(
    v-else,
    :action="iconOnly",
    :overrides="{ primary }",
    @action="() => { onAction && onAction(); }",
    @mouseenter="() => { onMouseEnter && onMouseEnter(); }",
    @touchstart="() => { onTouchStart && onTouchStart(); }",
  )
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { ButtonFrom } from '@/components/Button';
import styles from '@/classes/Page-Header.json';
import { UseMediaQuery } from '@/utilities/media-query';
import type { IconSource } from '@/utilities/type';

interface PrimaryActionProps {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconSource;
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
}

const props = defineProps<PrimaryActionProps>();

const slots = useSlots();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const primary = computed(() => !props.primary ? true : props.primary);

const iconOnly = computed(() => {
  return shouldShowIconOnly(isNavigationCollapsed, props);
});

const hasSlot = computed(() => {
  if (slots.default && slots.default()[0].children) {
    if (typeof slots.default()[0].children === 'string') {
      return slots.default()[0].children !== 'v-if';
    }
    return Array.isArray(slots.default()[0].children) && (slots.default()[0].children as []).length > 0;
  }
  return true;
});

function shouldShowIconOnly(
  isMobile: boolean,
  action: PrimaryActionProps,
): PrimaryActionProps {
  let { content, accessibilityLabel, icon } = action;
  if (icon == null) {
    return { ...action, icon: undefined };
  }

  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  } else {
    icon = undefined;
  }

  return {
    ...action,
    content,
    accessibilityLabel,
    icon,
  };
}
</script>

