import { ref } from 'vue';
import { IndexFiltersMode } from '@/components/IndexFilters/types';

export function useSetIndexFiltersMode(defaultMode = IndexFiltersMode.Default) {
  const mode = ref<IndexFiltersMode>(defaultMode);

  const setMode = (newMode: IndexFiltersMode) => {
    mode.value = newMode;
  };

  return { mode, setMode };
}
