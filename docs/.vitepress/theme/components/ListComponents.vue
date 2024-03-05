<template lang="pug">
.docs-component-list
  .docs-component-list__item(
    v-for="component in data",
    :key="component.name",
  )
    .docs-component-list__item__thumbnail
      a(:href="withBase(`/components/${component.name}`)")
        img(
          :src="withBase(`/assets/components-content/images/${component.previewImg}`)",
          :alt="component.name",
        )
    .docs-component-list__item__content
      .docs-component-list__item__content__info
        h4
          a(:href="withBase(`/components/${component.name}`)") {{ component.name }}
        p {{ component.description }}
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress';
import { computed, onMounted, ref } from 'vue';

const { frontmatter, theme } = useData();

const data = ref([]);

const sidebar = computed(() => theme.value.sidebar);
const category = computed(() => frontmatter.value.title);

const components = computed(() => {
  const componentMenu = sidebar.value.find((item) => item.text === 'Components').items;
  const cat = componentMenu.find(c => c.text === category.value)?.items;

  if (!cat) {
    return [];
  }

  const output = cat.map((component) => component.link.replace(/\/components\/(\w*)/, '$1'));

  return output;
});

async function initialize() {
  for (const c of components.value) {
    const info = await fetchComponentInfo(c);

    if (!info) {
      continue;
    }

    data.value.push(info);
  }
}

onMounted(() => {
  initialize();
});

function fetchComponentInfo(name: string) {
  const url = withBase(`/assets/components-content/${name}.json`);

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
.docs-component-list {
  --props-grid-item-min-width: 16rem;
  --props-grid-gap-x: var(--props-grid-gap,1rem);
  --props-grid-gap-y: var(--props-grid-gap,1.75rem);
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(min(var(--props-grid-item-min-width),100%),1fr));
  grid-gap: var(--props-grid-gap-y) var(--props-grid-gap-x);
  gap: var(--props-grid-gap-y) var(--props-grid-gap-x);
}

.docs-component-list__item__thumbnail {
  display: block;
  margin-bottom: 1rem;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-600);
  overflow: hidden;
  background: var(--p-color-bg-surface-secondary-hover);
  position: relative;
  border: 1px solid var(--p-color-border);

  a, img {
    display: block;
  }
}

.docs-component-list__item__content__info {
  h4 {
    font-size: var(--font-size-600);
    line-height: 1.25;
    margin-bottom: 0.25rem;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    color: var(--text-link);
    font-weight: var(--font-weight-700);
    letter-spacing: var(--letter-spacing-200);
    text-decoration: none;

    &:hover {
      color: var(--text-link);
    }
  }

  p {
    padding-right: 0.5rem;
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.4em;
    color: var(--text);
  }
}
</style>
