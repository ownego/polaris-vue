<template lang="pug">
div(:class="titleWrapperclassName")
  TitlePage(
    :title="title",
    :subtitle="subtitle",
    :compactTitle="compactTitle",
    :hasSubtitleMaxWidth="hasSubtitleMaxWidth",
  )
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import styles from '@polaris/components/Page/components/Header/Header.module.css';
import { Title as TitlePage } from '../components/Title';
import { classNames } from '@/utilities/css';

interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
  /** Whether or not to add a max-width to the subtitle. Gets calculated by
   * the presence of either the secondaryActions or actionGroups props on the
   * Header that consumes this component */
  hasSubtitleMaxWidth?: boolean;
}

const props = defineProps<TitleProps>();

const titleWrapperclassName = computed(() => classNames(
  styles.TitleWrapper,
  !props.hasSubtitleMaxWidth && styles.TitleWrapperExpand,
));
</script>
