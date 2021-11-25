import Vue from 'vue';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

Vue.config.productionTip = false;

Vue.use(PolarisVue);

new Vue({
  render: (h) => h(Demo),
}).$mount('#app');
