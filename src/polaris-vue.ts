import type { App, Component } from 'vue';

import * as components from '@/components';

const PolarisVue = {
  install(Vue: App) {
    for (const component in components) {
      const componentElement = components[component as keyof typeof components] as Component;
      Vue.component(component, componentElement);
    }
  },
};

export * from '@/components';

export default PolarisVue;
