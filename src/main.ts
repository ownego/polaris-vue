import { createApp } from 'vue';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
createApp(Demo as any).use(PolarisVue).mount('#app');
