import { isElementInViewport } from 'polaris-react/src/utilities/is-element-in-viewport';

type Filter = (element: Element) => void;

const FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';

function matches(node: HTMLElement, selector: string) {
  if (node.matches) {
    return node.matches(selector);
  }

  const theMatches = (node.ownerDocument || document).querySelectorAll(selector);
  let i = theMatches.length;
  while (i >= 0 && theMatches.item(i) !== node) {
    i -= 1;
    return i > -1;
  }
}

// Popover needs to be able to find its activator even
// if it is disabled, which FOCUSABLE_SELECTOR doesn't support.
export function findFirstFocusableNodeIncludingDisabled(
  element: HTMLElement,
): HTMLElement | null {
  const focusableSelector = 'a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]';

  if (matches(element, focusableSelector)) {
    return element;
  }

  return element.querySelector(focusableSelector);
}

export function nextFocusableNode(
  node: HTMLElement,
  filter?: Filter,
): HTMLElement | Element | null {
  const allFocusableElements = [
    ...document.querySelectorAll(FOCUSABLE_SELECTOR),
  ];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);

  // eslint-disable-next-line no-restricted-syntax
  for (const focusableElement of focusableElementsAfterNode) {
    if (
      isElementInViewport(focusableElement)
      && (!filter || (filter && filter(focusableElement)))
    ) {
      return focusableElement;
    }
  }

  return null;
}

export function focusNextFocusableNode(node: HTMLElement, filter?: Filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }

  return false;
}

export function findFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) {
    return element;
  }

  return element.querySelector(FOCUSABLE_SELECTOR);
}
