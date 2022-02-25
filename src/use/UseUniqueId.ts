import { ref, inject } from 'vue';
import type { UniqueIdFactory } from 'polaris-react/src/utilities/unique-id/unique-id-factory';
import { MissingAppProviderError } from '@/utilities/errors';

export default function UseUniqueId() {
  const idFactory = inject('uniqueIdFactory') as UniqueIdFactory;

  const uniqueIdRef = ref<string>('');

  function useUniqueId(prefix = '', overrideId = '') {
    if (!idFactory) {
      throw new MissingAppProviderError('No UniqueIdFactory was provided.');
    }

    if (overrideId) {
      return overrideId;
    }

    // If a unique id has not yet been generated, then get a new one
    if (!uniqueIdRef.value) {
      uniqueIdRef.value = idFactory.nextId(prefix);
    }

    return uniqueIdRef.value;
  }

  return { uniqueIdRef, useUniqueId };
}
