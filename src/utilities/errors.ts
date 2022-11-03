export class MissingAppProviderError extends Error {
  constructor(message = '') {
    super(
      `${
        message ? `${message} ` : message
      }Your application must be wrapped in an <AppProvider> component. See https://ownego.github.io/polaris-vue/?path=/docs/components-app-provider for implementation instructions.`,
    );
    this.name = 'MissingAppProviderError';
  }
}

export class MissingFrameError extends Error {
  constructor(message = '') {
    super(
      `${
        message ? `${message} ` : message
      }Your component must be wrapped in a <Frame> component. See https://ownego.github.io/polaris-vue/?path=/docs/components-frame--page for implementation instructions.`,
    );
    this.name = 'MissingFrameError';
  }
}
