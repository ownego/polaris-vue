import { createApp, type Component } from 'vue';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

createApp(Demo as any).use(PolarisVue).mount('#app');
