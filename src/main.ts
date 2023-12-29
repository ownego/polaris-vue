import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './Demo.vue';
import PolarisVue from './polaris-vue';

// Define routes for development stage
const routes = [
  { path: '/', component: App },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(PolarisVue)
  .use(router)
  .mount('#app');
