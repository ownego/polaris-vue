<template lang="pug">
div(:class="styles.TitleWrapper")
  h1(
    v-if="title",
    :class="className",
  )
    Text(
      as="span",
      variant="headingLg",
      font-weight="bold",
    ) {{ title }}
  Bleed(
    marginBlock="100",
  )
    slot
div(
  v-if="subtitle",
  :class="classNames(styles.SubTitle, compactTitle && styles.SubtitleCompact)",
)
  Text(as="p", variant="bodySm", tone="subdued") {{ subtitle }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import { Text, Bleed } from '@/components';
import styles from '@polaris/components/Page/components/Header/components/Title/Title.module.css';

export interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type */
  subtitle?: string;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
  /** Whether or not to add a max-width to the subtitle. Gets calculated by
   * the presence of either the secondaryActions or actionGroups props on the
   * Header that consumes this component */
  hasSubtitleMaxWidth?: boolean;
}

const props = defineProps<TitleProps>();

const className = computed(() => classNames(
  styles.Title,
  props.subtitle && styles.TitleWithSubtitle,
  props.hasSubtitleMaxWidth && styles.SubtitleMaxWidth,
));
</script>
