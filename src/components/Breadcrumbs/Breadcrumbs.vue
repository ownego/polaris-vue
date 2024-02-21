<template lang="pug">
nav(role="navigation")
  Button(
    :key="backAction.content",
    :url="url",
    :icon="ArrowLeftIcon",
    :accessibilityLabel="backAction.accessibilityLabel ?? backAction.content",
    @click="callbackOnAction",
    @pointerdown="handleMouseUpByBlurring",
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ArrowLeftIcon from '@icons/ArrowLeftIcon.svg';
import type { CallbackAction, LinkAction } from '@/utilities/types';
import { handleMouseUpByBlurring } from '@/utilities/focus';

export interface BreadcrumbsProps {
  /** Back action link */
  backAction: CallbackAction | LinkAction;
}

const props = defineProps<BreadcrumbsProps>();

const url = computed(() =>
  'url' in props.backAction ? props.backAction.url : undefined
);

const callbackOnAction = computed(() =>
  'onAction' in props.backAction ? props.backAction.onAction : undefined
);
</script>
