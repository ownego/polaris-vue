import { inject } from 'vue';

export default function useWithinContentContext() {
  const context = inject<boolean>('false');

  return context;
}
