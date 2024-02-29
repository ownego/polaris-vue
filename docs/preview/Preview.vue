<template lang="pug">
.preview-wrapper
  #preview
</template>

<script setup lang="ts">
import { createApp, defineAsyncComponent, onMounted, h } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import { useData } from 'vitepress';
import PolarisVue from '../../src/polaris-vue';
import { AppProvider } from '../../src/components';
import lang from '../../polaris/polaris-react/locales/en.json';

const { params } = useData();

const isAppProvider = params.value.component === 'AppProvider';

const exampleComponent = defineAsyncComponent(() =>
  import(`../components/${params.value.component}/${params.value.example}.vue`)
);

const wrappedComponent = () => {
  return h(
    AppProvider,
    { i18n: lang },
    () => h(exampleComponent),
  );
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/preview/:example',
      component: {},
    },
  ],
});

onMounted(() => {
  // 400ms - To fit with the example iframe delay on loaded
  setTimeout(() => {
    const app = createApp(
      isAppProvider
        ? exampleComponent
        : wrappedComponent
    );
    app.use(router)
    app.use(PolarisVue);
    app.mount('#preview');
  }, 400);

  document.documentElement.classList.add('example-preview');
});
</script>

<style lang="scss">
html.example-preview {
  &,
  body {
    background-color: #f1f1f1;
  }
}

.preview-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  background-color: #f1f1f1;
  min-height: 100vh;
}
#preview {
  width: 100%;
  background-color: #f1f1f1;
}
</style>
