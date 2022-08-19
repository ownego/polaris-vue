<template lang="pug">
Tooltip(
  :content="(textRef && textRef.innerText) || ''",
)
  span(
    ref="textRef",
    :class="className",
  )
    slot
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tooltip } from '@/components';

interface Props {
  className?: string;
}

defineProps<Props>();

const textRef = ref<HTMLElement | null>(null);
</script>
