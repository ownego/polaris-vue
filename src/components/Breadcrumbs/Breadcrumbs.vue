<template lang="pug">
nav(v-if="breadcrumb", role="navigation")
  UnstyledLink(
    v-if="linkUrl",
    :key="breadcrumb.content",
    :url="linkUrl",
    :class="styles.Breadcrumb",
    :aria-label="breadcrumb.accessibilityLabel",
    @mouseup="handleMouseUpByBlurring",
  )
    span(:class="styles.Icon")
      Icon(:source="ArrowLeftMinor")
    VisuallyHidden {{ breadcrumb.content }}
  button(
    v-else,
    type="button",
    :key="breadcrumb.content",
    :class="styles.Breadcrumb",
    :aria-label="breadcrumb.accessibilityLabel",
    @mouseup="handleMouseUpByBlurring",
    @click="callbackOnAction",
  )
    span(:class="styles.Icon")
      Icon(:source="ArrowLeftMinor")
    VisuallyHidden {{ breadcrumb.content }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import styles from '@/classes/Breadcrumbs.json';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import ArrowLeftMinor from '@icons/ArrowLeftMinor.svg';
import type { CallbackAction, LinkAction } from '@/utilities/type';
import { VisuallyHidden } from '../VisuallyHidden';
import { Icon } from '../Icon';
import { UnstyledLink } from '../UnstyledLink';

interface BreadcrumbsProps {
  /** Collection of breadcrumbs */
  breadcrumbs: (CallbackAction | LinkAction)[];
}

const props = defineProps<BreadcrumbsProps>();

const breadcrumb = ref(props.breadcrumbs[props.breadcrumbs.length - 1]);

const linkUrl = computed(() => {
  const { url } = breadcrumb.value as LinkAction;
  return url;
});

const callbackOnAction = computed(() => {
  const { onAction } = breadcrumb.value as CallbackAction;
  return onAction;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Breadcrumbs/Breadcrumbs.scss';
</style>
