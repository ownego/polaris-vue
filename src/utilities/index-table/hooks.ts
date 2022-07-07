import type { ComputedRef, Ref } from 'vue';
import { inject } from 'vue';
import type { RowContextType, ScrollContextType } from './context';

export function useRowContext() {
  const context = inject<ComputedRef<RowContextType>>('RowContext', {} as any);
  return context;
}

export function useRowHovered() {
  const hovered = inject<(Ref<boolean>) | undefined>('RowHoveredContext', undefined);
  return hovered;
}

export function useRowSelected() {
  const { selected } = inject<RowContextType>('RowContext', {});
  return selected;
}

export function useContainerScroll() {
  const scrolledContainerRef = inject<Ref<ScrollContextType> | null>('ScrollContext', null);
  return scrolledContainerRef;
}
