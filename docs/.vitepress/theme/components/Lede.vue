<template lang="pug">
.docs-lede
  .docs-lede-content(v-html="markdownContent")
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import MarkdownIt from 'markdown-it';

const slots = useSlots();
const md = new MarkdownIt();

const markdownContent = computed(() => {
  return md.render(slots.default?.()[0].children as string || '');
});
</script>

<style lang="scss">
@import '../scss/lede.scss';
</style>
