<template lang="pug">
a(
  ref="anchorNode",
  :id="id",
)
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useId from '@/use/useId';
import useScrollable from '@/use/useScrollable';

const id = useId();
const scrollToPosition = useScrollable();

const anchorNode = ref<HTMLAnchorElement | null>(null);

onMounted(() => {
  if (scrollToPosition && anchorNode.value) {
    scrollToPosition(anchorNode.value.offsetTop);
  }
});
</script>
