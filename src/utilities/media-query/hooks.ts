import { inject } from 'vue';
import type { MediaQueryContextType } from './context';
import { MissingAppProviderError } from '../errors';

export default function UseMediaQuery() {
  const mediaQuery = inject('mediaQueryContext', {}) as MediaQueryContextType;

  function useMediaQuery() {
    if (!mediaQuery) {
      throw new MissingAppProviderError('No mediaQuery was provided.');
    }

    return mediaQuery;
  }

  return { useMediaQuery };
}
