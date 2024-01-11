import {
  type Component as ComponentType,
  h,
  isVNode,
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
export function isElementOfType(
  element: VNode | null | undefined,
  Component: ComponentType,
): boolean {
  if (element == null || !isVNode(element)) {
    return false;
  }

  const type = element.type;

  return type === Component;
}
