import {
  type Component as ComponentType,
  h,
  VNode
} from 'vue';

// Wraps `element` in `Component`, if it is not already an instance of
// `Component`. If `props` is passed, those will be added as props on the
// wrapped component. If `element` is null, the component is not wrapped.
export function wrapWithComponent(
  element: VNode | null | undefined,
  Component: ComponentType,
  props: Record<string, any>,
): VNode | null {
  if (element == null) {
    return null;
  }

  return isElementOfType(element, Component) ? element : h(Component, props, element);
}

// Checks whether `element` is a Vue component of type `Component`.
// Note: There will be type errors in this method, but we will improve them later
export function isElementOfType(
  element: VNode | null | undefined,
  Component: ComponentType,
): boolean {
  if (element == null) {
    return false;
  }

  // First we need to check if the element is a Vue component
  if (!element.type || !element.type.__name) {
    return false; 
  }

  const elementType = element.type.__name;
  const componentType = Component.__name; 

  return elementType === componentType;
}
