import { inject } from 'vue';

type ScrollToPositionFn = (scrollY: number) => void;

export default function useScrollable() {
  const context = inject<ScrollToPositionFn | undefined>('scrollable');

  return context;
}
