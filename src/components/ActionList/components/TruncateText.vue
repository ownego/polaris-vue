<template lang="pug">
Tooltip(
  v-if="isOverflowing",
  preferredPosition="above",
  dismissOnMouseOut,
  :z-index-override="Number(theme.zIndex['z-index-11'])",
  :hover-delay="1000"
)
  template(#content)
    slot
  Text(as="span", truncate)
    slot
Text(
  v-else,
  as="span",
  truncate,
)
  Box(width="100%", ref="textRef")
    slot
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useTheme from '@/use/useTheme';
import {
  Tooltip, Box, Text,
} from '@/components';

const theme = useTheme();

const textRef = ref<HTMLSpanElement | null>(null);
const isOverflowing = ref(false);

onMounted(
  () => {
    if (textRef.value) {
      isOverflowing.value = textRef.value.scrollWidth > textRef.value.offsetWidth;
    }
  },
);
</script>
