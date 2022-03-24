<template lang="pug">
div(
  :class="className",
  role="status",
  aria-label="{{lang['Polaris.SkeletonPage.loadingLabel']}}",
)
  div(
    :class="styles.Header",
  )
    div(
      v-if="props.breadcrumbs",
      :class="styles.BreadcrumbAction",
      :style="{width: '60px'}",
    )
      SkeletonBodyText(:lines="1")
    div(
      :class="styles.TitleAndPrimaryAction",
    )
      div(
        :class="styles.TitleWrapper",
      )
        h1(
          v-if="props.title",
          :class="styles.Title",
        ) {{ props.title }}
        div(
          v-else,
          :class="styles.SkeletonTitle",
        )
      div(
        v-if="props.primaryAction",
        :class="styles.PrimaryAction",
      )
        SkeletonDisplayText(:size="`large`")
  div(
    :class="styles.Content",
  )
    slot
</template>
<script setup lang="ts">
import styles from '@/classes/SkeletonPage.json';
import { classNames } from 'polaris-react/src/utilities/css';
import lang from 'polaris-react/locales/en.json';
import { SkeletonBodyText, SkeletonDisplayText} from "@/components";

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
  title: "",
  fullWidth: false,
  narrowWidth: false,
  primaryAction: false,
  breadcrumbs: false,
});

const className = classNames(
  styles.Page,
  props.fullWidth && styles.fullWidth,
  props.narrowWidth && styles.narrowWidth,
);
</script>
<style lang="scss">
@import 'polaris-react/src/components/SkeletonPage/SkeletonPage.scss';
</style>
