import { createApp } from 'vue';
import App from './Demo.vue';
import PolarisVue from './polaris-vue';

createApp(App)
  .use(PolarisVue)
  .mount('#app');
