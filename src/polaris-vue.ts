import _Vue from 'vue';
import * as components from '@/components';

// install function executed by Vue.use()
const PolarisVue = function installPolarisVue(Vue: typeof _Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Export all
export default PolarisVue;

// Export single component
export * from '@/components';
