import { type Component } from 'vue';
import type { VueNode } from './types';

// Checks whether `element` is a Vue component of type `Component`.
// Note: There will be type errors in this method, but we will improve them later
export function isElementOfType(
  element: VueNode,
  component: Component,
): boolean {
  if (!element) {
    return false;
  }

  if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
    return false;
  }

  const typeElement = (element as any).type;

  // First we need to check if the element is a Vue component
  if (!typeElement || !typeElement.__name) {
    return false;
  }


  const elementName = typeElement.__name;
  const componentName = (component as any).__name;

  const elementId = typeElement.__hmrId;
  const componentId = (component as any).__hmrId;

  return elementId === componentId && elementName === componentName;
}
