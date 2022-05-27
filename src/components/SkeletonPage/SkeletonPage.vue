<template lang="pug">
div(
  :class="className",
  role="status",
  :aria-label="i18n.translate('Polaris.SkeletonPage.loadingLabel')",
)
  div(:class="styles.Header")
    div(
      v-if="breadcrumbs",
      :class="styles.BreadcrumbAction",
      :style="{ width: '60px' }",
    )
      SkeletonBodyText(:lines="1")
    div(:class="styles.TitleAndPrimaryAction")
      div(:class="styles.TitleWrapper")
        h1(
          v-if="title",
          :class="styles.Title",
        ) {{ title }}
        div(
          v-else,
          :class="styles.SkeletonTitle",
        )
      div(
        v-if="primaryAction",
        :class="styles.PrimaryAction",
      )
        SkeletonDisplayText(size="large")
  div(:class="styles.Content")
    slot
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/SkeletonPage.json';
import { SkeletonBodyText, SkeletonDisplayText } from '@/components';
import { UseI18n } from '@/use';

interface Props {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
  /** Shows a skeleton over the breadcrumb */
  breadcrumbs?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
});

const i18n = UseI18n();

const className = computed(() => classNames(
  styles.Page,
  props.fullWidth && styles.fullWidth,
  props.narrowWidth && styles.narrowWidth,
));
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/SkeletonPage/SkeletonPage.scss';
</style>
