import { inject } from 'vue';

export default function useWithinContentContext() {
  const context = inject<boolean>('within-content-context', false);

  return context;
}
