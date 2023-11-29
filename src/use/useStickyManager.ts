import { inject } from 'vue';
import type { StickyManager } from '@/utilities/sticky-manager';

export default function useStickyManager() {
  const context = inject('sticky-manager') as StickyManager;
  return context;
}
