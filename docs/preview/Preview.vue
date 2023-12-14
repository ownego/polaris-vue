<template lang="pug">
.preview-wrapper
  #preview
</template>

<script setup lang="ts">
import { createApp, defineAsyncComponent, onMounted } from 'vue';
import { useData } from 'vitepress';
import PolarisVue from '../../src/polaris-vue';

const { params } = useData();

const exampleComponent = defineAsyncComponent(() =>
  import(`../components/${params.value.component}/${params.value.example}.vue`)
);

onMounted(() => {
  const app = createApp(exampleComponent);
  app.use(PolarisVue);
  app.mount('#preview');
});
</script>

<style lang="scss">
body {
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
