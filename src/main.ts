import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

const routes = [
  { path: '/', component: Demo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
createApp(Demo as any)
  .use(PolarisVue)
  .use(router)
  .mount('#app');
