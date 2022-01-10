export enum PopoverCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

export enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

export type PopoverAutofocusTarget = 'none' | 'first-node' | 'container';

export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}

export function setActivatorAttributes(
  activator: HTMLElement,
  {
    id,
    active = false,
    ariaHaspopup,
    activatorDisabled = false,
  }: {
    id: string;
    active: boolean;
    ariaHaspopup: string;
    activatorDisabled: boolean;
  },
) {
  if (!activatorDisabled) {
    // eslint-disable-next-line no-param-reassign
    activator.tabIndex = activator.tabIndex || 0;
  }

  activator.setAttribute('aria-controls', id);
  activator.setAttribute('aria-owns', id);
  activator.setAttribute('aria-expanded', String(active));

  if (ariaHaspopup != null) {
    activator.setAttribute('aria-haspopup', String(ariaHaspopup));
  }
}
