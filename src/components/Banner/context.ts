import { inject } from 'vue';

export default function useWithinContentContext() {
  const context = inject<boolean>('WithinContentContext', false);

  return context;
}
