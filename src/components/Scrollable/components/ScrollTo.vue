<template lang="pug">
a(:id="id", ref="anchorNode")
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import { UseUniqueId } from '@/use';

type ScrollToPositionFn = (scrollY: number) => void;

const scrollToPosition = inject<ScrollToPositionFn>('scrollToPositionContext', () => false);

const anchorNode = ref<HTMLAnchorElement | null>(null);

const { useUniqueId } = UseUniqueId();
const id = useUniqueId('ScrollTo');

onMounted(() => {
  if (!scrollToPosition || !anchorNode.value) {
    return;
  }

  scrollToPosition(anchorNode.value.offsetTop);
});
</script>
