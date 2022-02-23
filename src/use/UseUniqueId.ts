import { ref, inject } from 'vue';
import { UniqueIdFactory } from 'polaris-react/src/utilities/unique-id/unique-id-factory';
import { MissingAppProviderError } from '@/utilities/errors';

export default function UseUniqueId() {
  const idFactory = inject('uniqueIdFactory') as UniqueIdFactory;

  const uniqueIdRef = ref<string | null>(null);

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

    return uniqueIdRef;
  }

  return { uniqueIdRef, useUniqueId };
}
