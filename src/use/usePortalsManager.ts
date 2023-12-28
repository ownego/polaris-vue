import { inject } from 'vue';

type PortalsContainerElement = HTMLElement | null;

export interface PortalsManager {
  container: PortalsContainerElement;
}

export default function usePortalsManager() {
  const context = inject<PortalsManager | undefined>('portals-manager', undefined);

  if (!context) {
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    ); 
  }

  return context;
}
