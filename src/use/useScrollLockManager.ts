import { inject } from 'vue';
import type { ScrollLockManager } from '@polaris/utilities/scroll-lock-manager/scroll-lock-manager';

export default function useScrollLockManager() {
  const context = inject('scroll-lock-manager') as ScrollLockManager;
  return context;
}
