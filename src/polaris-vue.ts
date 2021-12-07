import _Vue from 'vue';
import {
  VisuallyHidden,
  Icon,
  UnstyledLink,
  Link,
  List,
  ListItem,
} from './components';

const components = [
  VisuallyHidden,
  Icon,
  UnstyledLink,
  Link,
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
  VisuallyHidden,
  Icon,
  UnstyledLink,
  Link,
  List,
  ListItem,
};

// Export all
export default PolarisVue;
