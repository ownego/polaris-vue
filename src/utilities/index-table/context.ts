import type { Ref } from 'vue';

export interface RowContextType {
  itemId?: string;
  selected?: boolean;
  disabled?: boolean;
  onInteraction?: (event: Event) => void;
}

export interface ScrollContextType {
  scrollableContainer: Ref<HTMLDivElement | null> | null;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}
