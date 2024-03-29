<template lang="pug">
.docs-examples(v-if="examples && examples.length > 0")
  //- Tabs for each example
  .docs-examples-tabs
    .docs-examples-tab(v-for="(example, index) in examples" :key="index")
      button.docs-examples-tab-button(
        :class="{ 'docs-examples-tab-button--active': selectedExampleIndex === index }",
        @click="switchExample(index)",
      ) {{ example.title }}

  .docs-examples-description(
    v-if="examples[selectedExampleIndex].description",
    v-html="md.render(examples[selectedExampleIndex].description)",
  )
  //- Iframe to show example
  .frame-wrapper(:style="{ height: `${frameHeight}px` }")
    iframe.preview-frame(
      ref="iframeRef",
      :src="withBase(`/preview/${component}-${selectedFile}`)",
      :height="frameHeight",
      :class="`preview-frame__${component} ${isLoadingFrame ? 'preview-frame--loading' : ''}`",
      @load="iframeLoaded",
    )

  //- slot for example code snippet
  slot

  component(is="style") {{ styles }}
</template>

<script setup lang="ts">
import { computed, ref, onMounted, useSlots } from 'vue';
import { useData, useRouter, withBase } from 'vitepress';
import MarkdownIt from 'markdown-it';

const slots = useSlots();

const md = new MarkdownIt();
const { frontmatter, page } = useData();
const { route } = useRouter();

const isLoadingFrame = ref(true);
const selectedExampleIndex = ref(0);
const iframeRef = ref<HTMLIFrameElement | null>(null);

const examples = frontmatter.value.examples;
const pageSlug = page.value.title.replace(/\s+/g, '-').toLowerCase();

const examplesSlugs = computed(() => {
  return examples.map((example) => {
    const name = example.title.replace(/\s+/g, '-').toLowerCase();
    return `${pageSlug}-${name}`;
  });
});

const selectedExample = computed(() => {
  return examples[selectedExampleIndex.value];
});

const selectedFile = computed(() => {
  return selectedExample.value.fileName.replace(/\.vue$/, '');
});

const frameHeight = computed(() => {
  return selectedExample.value.frameHeight || 398;
});

const component = computed(() => {
  const componentName = page.value.filePath.match(/\/(\w*)\/README\.md/);

  if (componentName) {
    return componentName[1];
  }

  return page.value.title;
});

const styles = computed(() => {
  return `.docs-example-code[data-example="${selectedExampleIndex.value}"] { display: block; }`;
});

const switchExample = (index: number) => {
  if (index === selectedExampleIndex.value) {
    return;
  }

  // Change url
  const example = examplesSlugs.value[index];
  const q = new URLSearchParams(window.location.search);
  q.set('example', example);

  history.pushState(null, '', `${route.path}?${q.toString()}`);

  selectedExampleIndex.value = index;
  isLoadingFrame.value = true;
};

const iframeLoaded = () => {
  setTimeout(() => {
    isLoadingFrame.value = false;
  }, 400);
};

// Initialize example query param
const urlQuery = new URLSearchParams(window.location.search);
const example = urlQuery.get('example');

if (example) {
  const index = examplesSlugs.value.indexOf(example);

  if (index !== -1) {
    selectedExampleIndex.value = index;
  }
}
</script>

<style lang="scss">
.docs-example-code {
  display: none;
  max-height: 50vh;

  & > div[class*="language-"] {
    max-height: 50vh;
    overflow: auto;
  }
}

.docs-examples-description {
  font-size: 0.85rem;
  color: var(--text);

  p {
    line-height: 1.25rem;
  }
}

.docs-examples-tabs {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.docs-examples-tab-button {
  padding: 0.45rem 0.65rem;
  text-align: left;
  display: flex;
  align-items: flex-start;
  background: transparent;
  box-shadow: var(--card-shadow);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.33;
  color: var(--text-strong);

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }

  &.docs-examples-tab-button--active {
    background: var(--surface-active);
  }
}

.frame-wrapper {
  position: relative;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 10px;
}

.preview-frame {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border: 0;
  opacity: 1;
  border-radius: 10px;
  overflow: auto;
  background-color: #f1f1f1;
}

.preview-frame--loading {
  opacity: 0;
  z-index: -1;
}
</style>
