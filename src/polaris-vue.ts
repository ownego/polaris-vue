import type { App } from 'vue';

import * as components from '@/components';

const PolarisVue = {
  install(Vue: App) {
    Object.entries(components).forEach(([name, component]) => {
      Vue.component(name, component);
    })
  },
};

export * from '@/components';

export { useBreakpoints } from '@/utilities/breakpoints';

export default PolarisVue;
