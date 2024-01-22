import { inject } from 'vue';
import type { FeaturesConfig } from '@/utilities/features'

export default function useFeaturesContext() {
  const context = inject<FeaturesConfig>('features');

  if (!context) {
    throw new Error('No Features were provided.');
  }

  return context;
}
