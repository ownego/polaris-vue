import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.component('router-link', Vue.component('RouterLink'));

export const decorators = [(story) => ({
  components: {story},
  template: '<story />',
  router: new VueRouter()
})];

export const parameters = {
  viewMode: 'docs',
  actions: { disable: true },
  controls: {
    matchers: {
      color: /(background|color|backgroundColor)$/i,
      date: /Date$/,
    },
    sort: 'alpha',
  },
  options: {
    showPanel: true,
    storySort: {
      order: [
        "Get Started",
        "Changelog",
        "Actions",
        "Structure",
        "Forms",
        "Images & Icons",
        "Feedback indicators",
        "Titles & Text",
        "Behavior",
        "Lists & Tables",
        "Navigation",
        "Overlays",
      ]
    }
  },
}
