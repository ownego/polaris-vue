<template lang="pug">
div(
  v-if="hasSlot(slots.default)",
  :class="styles.TitleWithMetadataWrapper",
)
  h1(v-if="title", :class="className") {{ title }}
  div(:class="styles.TitleMetadata")
    slot
template(v-else)
  h1(v-if="title", :class="className") {{ title }}
div(
  v-if="subtitle",
  :class="subtitleClassName",
)
  p {{ subtitle }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Page-Title.json';
import { hasSlot } from '@/utilities/has-slot';

interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
}

const props = defineProps<TitleProps>();

const className = computed(() => {
  return classNames(
    styles.Title,
    props.subtitle && styles.TitleWithSubtitle,
  );
});

const subtitleClassName = computed(() => {
  return classNames(
    styles.SubTitle,
    props.compactTitle && styles.SubtitleCompact,
  );
});

const slots = useSlots();
</script>

<style lang="scss">
@import 'polaris-react/src/components/Page/components/Header/components/Title/Title.scss';
</style>
