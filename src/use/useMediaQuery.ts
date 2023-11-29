import { inject, ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { MediaQueryContextType } from '@/utilities/media-query';
import { navigationBarCollapsed } from '@/utilities/breakpoints';
import { useEventListener } from '@/utilities/use-event-listener';

export default function useMediaQuery() {
  const context = inject('media-query') as MediaQueryContextType;
  return context;
}

export function useMediaQueryContext() {
  const isNavigationCollapsed = ref(navigationBarCollapsed().matches);

  const handleResize = debounce(
    () => {
      if (isNavigationCollapsed.value !== navigationBarCollapsed().matches) {
        isNavigationCollapsed.value = !isNavigationCollapsed.value;
      }
    },
    40,
    {trailing: true, leading: true, maxWait: 40},
  );

  useEventListener('resize', handleResize);

  return {
    isNavigationCollapsed,
  };
}
