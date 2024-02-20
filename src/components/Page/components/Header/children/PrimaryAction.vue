<template lang="pug">
div(:class="styles.PrimaryActionWrapper")
  Box(printHidden)
    slot(v-if="hasSlot(slots.default)")
    Tooltip(
      v-else-if="helpText",
      :content="helpText",
    )
      ButtonFrom(
        :action="iconOnly",
        :overrides="{ primary }",
        @action="() => { onAction && onAction() }",
        @mouseenter="() => { onMouseEnter && onMouseEnter() }",
        @touchstart="() => { onTouchStart && onTouchStart() }",
      )
    ButtonFrom(
      v-else,
      :action="iconOnly",
      :overrides="{ primary }",
      @action="() => { onAction && onAction() }",
      @mouseenter="() => { onMouseEnter && onMouseEnter() }",
      @touchstart="() => { onTouchStart && onTouchStart() }",
    )
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useMediaQueryContext } from '@/use/useMediaQuery';
import { useHasSlot } from '@/use/useHasSlot';
import styles from '@polaris/components/Page/components/Header/Header.module.scss';
import type { PrimaryActionType } from '../Header.vue';

const props = defineProps<PrimaryActionType>();

const slots = useSlots();

const { hasSlot } = useHasSlot();
const { isNavigationCollapsed } = useMediaQueryContext();

const primary = computed(() => {
  const isPrimary = props.primary;
  return isPrimary === undefined ? true : isPrimary;
});

const iconOnly = computed(() => {
  return shouldShowIconOnly(isNavigationCollapsed.value, props);
});

function shouldShowIconOnly(
  isMobile: boolean,
  action: PrimaryActionType,
): PrimaryActionType {
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
