<template lang="pug">
BlockStack(:gap="400", inlineAlign="center")
  Box(
    width="100%",
    :padding="0",
    :paddingInlineStart="{sm: '600'}",
    :paddingInlineEnd="{sm: '600'}",
    :maxWidth="maxWidth",
    :aria-label="i18n.translate('Polaris.SkeletonPage.loadingLabel')",
    role="status",
  )
    BlockStack
      Box(
        width="100%",
        :paddingBlockStart="{ xs: '400', md: '500' }",
        :paddingBlockEnd="{ xs: '400', md: '500' }",
        :paddingInlineStart="{ xs: '400', sm: '0' }",
        :paddingInlineEnd="{ xs: '400', sm: '0' }",
      )
        InlineStack(
          align="space-between",
          blockAlign="center",
          :gap="400",
        )
          InlineStack(:gap="400")
            Box(
              v-if="backAction",
              background="bg-fill-tertiary",
              minHeight="2.25rem",
              minWidth="2.25rem",
              maxWidth="2.25rem",
              borderRadius="100",
            )
            Box(:paddingBlockStart="100", :paddingBlockEnd="100")
              Text(
                v-if="title",
                as="h1",
                variant="headingLg",
                font-weight="bold",
              ) {{ title }}
              template(v-else, :class="styles.SkeletonTitle")
                Box(
                  background="bg-fill-tertiary",
                  minWidth="120px",
                  minHeight="28px",
                  borderRadius="100",
                )
          Box(
            v-if="primaryAction",
            id="SkeletonPage-PrimaryAction",
            background="bg-fill-tertiary",
            minHeight="2.25rem",
            minWidth="6.25rem",
            borderRadius="100",
          )
      Box(paddingBlockEnd="200", width="100%")
        slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import { Text } from '@/components';
import useI18n from '@/use/useI18n';
import styles from '@polaris/components/SkeletonPage/SkeletonPage.module.css';

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
  /** Shows a skeleton over the backAction */
  backAction?: boolean;
}

defineSlots<{
  /** The child elements to render in the skeleton page. */
  default: (_?: VueNode) => any;
}>();

const props = withDefaults(defineProps<SkeletonPageProps>(), {
  title: '',
});

const i18n = useI18n();

const maxWidth = computed(() => {
  if (props.fullWidth) {
    return 'none';
  }

  if (props.narrowWidth) {
    return 'var(--pc-skeleton-page-max-width-narrow)';
  }

  return 'var(--pc-skeleton-page-max-width)';
});
</script>
