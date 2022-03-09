import { AppProvider } from '@/polaris-vue';

export const decorators = [(story) => ({
  components: {AppProvider, story},
  template: '<AppProvider><story /></AppProvider>',
})];

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
