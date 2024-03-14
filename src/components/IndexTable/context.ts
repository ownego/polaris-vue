import { inject, type Ref } from 'vue';

export interface RowContextType {
  itemId?: Ref<string>;
  selected?: Ref<boolean | 'indeterminate' | undefined>;
  disabled?: Ref<boolean>;
  position?: Ref<number>;
  onInteraction?: (event: MouseEvent | KeyboardEvent) => void;
}

export function useRowContext() {
  const context = inject<RowContextType>('rowContext', {});

  return context;
}

export function useRowHoveredContext() {
  const context = inject<Ref<boolean> | undefined>('rowHoveredContext');

  return context;
}

export interface ScrollContextType {
  scrollableContainer: HTMLDivElement | null;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export const scrollDefaultContext = {
  scrollableContainer: null,
  canScrollLeft: false,
  canScrollRight: false,
};

export function useScrollContext() {
  const context = inject<Ref<ScrollContextType> | undefined>('scrollContext');

  return context;
}
