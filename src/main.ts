import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo from './Demo.vue';
import PolarisVue from './polaris-vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(PolarisVue);

new Vue({
  router: new VueRouter(),
  render: (h) => h(Demo),
}).$mount('#app');
