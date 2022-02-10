import { isElementInViewport } from 'polaris-react/src/utilities/is-element-in-viewport';

type Filter = (element: Element) => void;

const KEYBOARD_FOCUSABLE_SELECTORS = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]:not([tabindex="-1"])';
const FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
const MENUITEM_FOCUSABLE_SELECTORS = 'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';

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

function getMenuFocusableDescendants(
  element: HTMLElement,
): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    MENUITEM_FOCUSABLE_SELECTORS,
  ) as NodeListOf<HTMLElement>;
}

function getCurrentFocusedElementIndex(
  allFocusableChildren: NodeListOf<HTMLElement>,
  currentFocusedElement: HTMLElement,
): number {
  let currentItemIdx = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement) {
      break;
    }
    currentItemIdx += 1;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}

export function wrapFocusPreviousFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement,
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement,
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx - 1 + allFocusableChildren.length) % allFocusableChildren.length
    ].focus();
  }
}

export function wrapFocusNextFocusableMenuItem(
  parentElement: HTMLElement,
  currentFocusedElement: HTMLElement,
) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(
    allFocusableChildren,
    currentFocusedElement,
  );
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[
      (currentItemIdx + 1) % allFocusableChildren.length
    ].focus();
  }
}

export const handleMouseUpByBlurring = (event: MouseEvent) => {
  const currentTarget = event.currentTarget as HTMLInputElement;
  currentTarget.blur();
};

export function focusFirstFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  findFirstFocusableNode(element, onlyDescendants)?.focus();
}

export function findFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  return element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}

export function findLastKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  const allFocusable = element.querySelectorAll(KEYBOARD_FOCUSABLE_SELECTORS);
  return allFocusable[allFocusable.length - 1] as HTMLElement | null;
}

export function focusFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  const firstFocusable = findFirstKeyboardFocusableNode(
    element,
    onlyDescendants,
  );
  if (firstFocusable) {
    firstFocusable.focus();
    return true;
  }

  return false;
}

export function focusLastKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  const lastFocusable = findLastKeyboardFocusableNode(element, onlyDescendants);
  if (lastFocusable) {
    lastFocusable.focus();
    return true;
  }

  return false;
}
