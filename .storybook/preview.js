import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import '!style-loader!css-loader!sass-loader!../src/scss/_vendors.scss';
// import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);
// Vue.component('router-link', Vue.component('RouterLink'));

// export const decorators = [(story) => ({
//   components: {story},
//   template: '<story />',
//   router: new VueRouter()
// })];

export const parameters = {
  viewMode: 'docs',
  docs: {
    transformSource: (src) => {
      const pattern = /<template>(.*)<\/template>/g;
      return `${src.replace(pattern, '$1')}`;
    },
    source: {
      state: 'open',
    },
  },
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
        "Polaris Icons",
        "Component Status",
        "Components",
        [
          "Actions",
          "Structure",
          "Forms",
          "Images and icons",
          "Feedback indicators",
          "Titles and text",
          "Behavior",
          "Lists and tables",
          "Navigation",
          "Overlays",
        ],
      ],
    },
  },
}
