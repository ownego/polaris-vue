import { scrollable } from 'polaris-react/src/components/shared';

export type ScrollToPositionFn = (scrollY: number) => void;

export function forNode(node: HTMLElement): HTMLElement | Document {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
}
