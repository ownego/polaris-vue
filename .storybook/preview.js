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
      language: 'html',
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
        "FAQs",
        "Components",
      ],
    },
  },
}
