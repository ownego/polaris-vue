import { scrollable } from 'polaris/polaris-react/src/components/shared';

export function forNode(node: HTMLElement): HTMLElement | Document {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
}
