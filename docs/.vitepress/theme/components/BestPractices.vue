<template lang="pug">
.docs-best-practices(v-if="content")
  .docs-best-practices__content(v-html="markdownContent")
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useData, withBase } from 'vitepress';
import MarkdownIt from 'markdown-it';

const { page } = useData();
const md = new MarkdownIt();

const content = ref<Record<string, any>>();

const markdownContent = computed(() => {
  return md.render(content.value?.bestPractices || '');
});

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

function fetchContent(): Promise<Record<string, any> | undefined> {
  const url = withBase(`/assets/components-content/${component.value}.json`);

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
