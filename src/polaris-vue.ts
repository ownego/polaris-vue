import _Vue from 'vue';
import {
  List,
  ListItem,
} from './components';

const components = [
  List,
  ListItem,
];

const PolarisVue = {
  name: 'PolarisVue',
  install(Vue: typeof _Vue) {
    // Define each component to the whole package
    components.forEach((c) => {
      Vue.component(c.name, c);
    });
  },
};

// Export single component
export {
  List,
  ListItem,
};

// Export all
export default PolarisVue;
