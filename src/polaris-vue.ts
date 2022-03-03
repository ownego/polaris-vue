import type { App, Component } from 'vue';
import * as components from './components';

const PolarisVue = {
  install(Vue: App) {
    for (const component in components) {
      const componentElement = components[component] as Component;
      Vue.component(component, componentElement);
    }
  },
};

// Export all
export default PolarisVue;

// Export single component
export * from './components';
