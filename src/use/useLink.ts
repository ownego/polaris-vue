import { inject } from 'vue';
import type { LinkLikeComponent } from '@/utilities/link';

export default function useLink() {
  const context = inject('link') as LinkLikeComponent;
  return context;
}
