<template lang="pug">
.docs-best-practices(v-if="content")
  .docs-best-practices__content(v-html="content.bestPractices")
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';
import type { ComponentApi } from '../types';
import MarkdownIt from 'markdown-it';

const { page } = useData();
const md = new MarkdownIt();

const content = ref<ComponentApi>();

const component = computed(() => {
  const componentName = page.value.filePath.match(/\/(\w*)\/README\.md/);

  if (componentName) {
    return componentName[1];
  }

  return page.value.title;
});

onMounted(async () => {
  content.value = await fetchContent();
});

function fetchContent(): Promise<ComponentApi | undefined> {
  const url = `/assets/components-content/${component.value}.json`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};
</script>

<style lang="scss">
.docs-best-practices {
  font-size: 0.85rem;
}
</style>
