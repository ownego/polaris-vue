import { inject } from 'vue';

export default function useFilterActions() {
  const context = inject('filterActions', { filterActions: false });
  return context;
}
