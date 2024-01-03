import { scrollable } from '@polaris/components/shared';

export const forNode = (node: HTMLElement): HTMLElement | Document => {
  const closestElement = node.closest(scrollable.selector);
  
  return closestElement instanceof HTMLElement ? closestElement : document;
};
