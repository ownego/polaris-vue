<template lang="pug">
Tooltip(
  v-if="isWithinWidth",
  :content="(textRef && textRef.innerText) || ''",
)
  span(ref="textRef", :class="className")
    slot
span(
  v-else,
  ref="textRef",
  :class="className",
)
  slot
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Tooltip } from '@/components';

interface Props {
  className?: string;
}

defineProps<Props>();

const textRef = ref<HTMLElement | null>(null);

const isWithinWidth = computed(() => {
  if (textRef.value) {
    return textRef.value.offsetWidth < textRef.value.scrollWidth;
  }

  return false;
})
</script>
