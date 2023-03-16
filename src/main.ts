import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

// Define routes for development stage
const routes = [
  { path: '/', component: Demo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(Demo)
  .use(PolarisVue)
  .use(router)
  .mount('#app');
