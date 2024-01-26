import { type Component } from 'vue';
import type { VueNode } from './types';

// Checks whether `element` is a Vue component of type `Component`.
// Note: There will be type errors in this method, but we will improve them later
export function isElementOfType(
  element: VueNode,
  component: Component,
): boolean {
  if (element == null) {
    return false;
  }

  // First we need to check if the element is a Vue component
  if (!element.type || !element.type.__name) {
    return false; 
  }

  const elementType = element.type.__name;
  const componentType = component.__name; 

  return elementType === componentType;
}
