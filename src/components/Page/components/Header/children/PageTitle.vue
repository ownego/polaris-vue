<template lang="pug">
div(:class="styles.TitleWrapper")
  Title(
    :title="title",
    :subtitle="subtitle",
    :compactTitle="compactTitle",
  )
    slot
</template>

<script setup lang="ts">
import styles from '@/classes/Page-Header.json';
import { Title } from '../components/Title';

interface TitleProps {
  /** Page title, in large type */
  title?: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Removes spacing between title and subtitle */
  compactTitle?: boolean;
}

const props = defineProps<TitleProps>();
</script>
