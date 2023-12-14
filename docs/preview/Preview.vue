<template lang="pug">
.preview-wrapper
  #preview
</template>

<script setup lang="ts">
import { createApp, defineAsyncComponent, onMounted, h } from 'vue';
import { useData } from 'vitepress';
import PolarisVue from '../../src/polaris-vue';
import { AppProvider } from '../../src/components';

const { params } = useData();

const isAppProvider = params.value.component === 'AppProvider';

const exampleComponent = defineAsyncComponent(() =>
  import(`../components/${params.value.component}/${params.value.example}.vue`)
);

const wrappedComponent = () => {
  return h(
    AppProvider,
    { i18n: {} },
    {
      default: () => h(exampleComponent),
    }
  )
}

onMounted(() => {
  const app = createApp(
    isAppProvider
      ? exampleComponent
      : wrappedComponent
  );
  app.use(PolarisVue);
  app.mount('#preview');
});
</script>

<style lang="scss">
html, body {
  background-color: #f1f1f1;
}

.preview-wrapper {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;
}
#preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #f1f1f1;
}
</style>
