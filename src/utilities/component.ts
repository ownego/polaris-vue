import { type Component, h } from 'vue';
import type { VueNode } from './types';

export function wrapWithComponent<Props>(
  element: VueNode | null | undefined,
  Component: Component,
  props: Props,
): VueNode | null {
  if (element == null) {
    return null;
  }

  return isElementOfType(element, Component) ? element : h(Component, { ...props, default: () => element });
}

function isElementOfType(element: VueNode, Component: any): boolean {
  return element instanceof Component;
}
