import { type Ref, inject } from 'vue';

export default function usePortalsManager() {
  const context = inject('portals-manager') as Ref<HTMLElement | null>;

  return context;
}
