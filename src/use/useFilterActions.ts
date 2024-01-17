import { inject } from 'vue';

export default function useFilterActions() {
  const context = inject('filter-actions', { filterActions: false });
  return context;
}
