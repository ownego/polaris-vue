<template lang="pug">
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useTheme from '@/use/useTheme';
import { Tooltip, Box, Text } from '@/components';

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
