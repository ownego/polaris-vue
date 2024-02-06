<template lang="pug">
nav(role="navigation")
  Button(
    :key="backAction.content",
    :url="'url' in backAction ? backAction.url : undefined",
    :icon="ArrowLeftIcon",
    :accessibilityLabel="backAction.accessibilityLabel ?? backAction.content",
    @click="'onAction' in backAction ? backAction.onAction : undefined",
    @pointerdown="handleMouseUpByBlurring",
  )
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@icons/ArrowLeftIcon.svg';
import type { CallbackAction, LinkAction } from '@/utilities/types';
import { handleMouseUpByBlurring } from '@/utilities/focus';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
}

defineProps<BreadcrumbsProps>();
</script>
