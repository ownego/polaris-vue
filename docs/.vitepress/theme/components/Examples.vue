<template lang="pug">
.docs-examples()
  //- Tabs for each example
  .docs-examples-tabs
    .docs-examples-tab(v-for="(example, index) in examples" :key="index")
      button.docs-examples-tab-button(
        :class="{ 'docs-examples-tab-button--active': selectedExampleIndex === index }",
        @click="switchExample(index)",
      ) {{ example.title }}

  .docs-examples-description(
    v-html="md.render(examples[selectedExampleIndex].description)",
  )
  //- Iframe to show example
  iframe.preview-frame(
    ref="iframeRef",
    :src="`/preview/${component}-${selectedFile}`",
    name="preview-frame",
    :class="`preview-frame__${component}`",
    :data-example-preview="selectedExampleIndex",
  )

  //- slot for example code snippet
  slot

  component(is="style") {{ styles }}
</template>

<script setup lang="ts">
import { computed, ref, h, defineAsyncComponent, onMounted, createApp } from 'vue';
import { useData } from 'vitepress';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const { frontmatter, page } = useData();

const selectedExampleIndex = ref(0);
const iframeRef = ref<HTMLIFrameElement | null>(null);


const examples = frontmatter.value.examples;


const selectedExample = computed(() => {
  return examples[selectedExampleIndex.value];
});

const selectedFile = computed(() => {
  return selectedExample.value.fileName.replace(/\.vue$/, '');
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
  selectedExampleIndex.value = index;
};

// Fix iframe timeStamp
// @see: https://github.com/vuejs/core/issues/3933#issuecomment-1214459923
const fixIframeEvent = () => {
  const handler = (e: any) => {
    Object.defineProperty(e, 'timeStamp', { get: () => performance.now() });
  };

  const events = Object.keys(window).filter(name => name.substring(0, 2) === 'on').map(name => name.substring(2));

  events.forEach((name: string) => {
    if (iframeRef.value && iframeRef.value.contentWindow) {
      iframeRef.value.contentWindow.addEventListener(name, handler, true);
    }
  });
};

onMounted(() => {
  fixIframeEvent();
});
</script>

<style lang="scss">
.docs-example-code {
  display: none;
}

.docs-examples-description {
  font-size: 0.85rem;
  color: rgb(176, 176, 188);
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
  box-shadow: inset 0 0 0 1px hsla(0,0%,100%,.12);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.33;
  color: #e7e7f1;

  &:hover {
    box-shadow: 0 4px 7px hsla(0,0%,100%,.1),inset 0 0 0 1px hsla(0,0%,100%,.12);
  }

  &.docs-examples-tab-button--active {
    background: #373737;
  }
}

.preview-frame {
  width: 100%;
  height: 400px;
  border: 0;
  border-radius: 6px;
  overflow: auto;
  background-color: #fafafa;
}
</style>
