import _Vue from 'vue';
import { List, ListItem } from './components';
declare const PolarisVue: {
    name: string;
    install(Vue: typeof _Vue): void;
};
export { List, ListItem, };
export default PolarisVue;
