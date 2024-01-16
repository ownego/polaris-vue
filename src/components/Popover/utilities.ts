
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

function wasContentNodeDescendant(
  composedPath: readonly EventTarget[],
  contentNode: React.RefObject<HTMLDivElement>,
) {
  return (
    contentNode.current != null && composedPath.includes(contentNode.current)
  );
}

function wasPolarisPortalDescendant(
  composedPath: readonly EventTarget[],
  portalsContainerElement: PortalsContainerElement,
): boolean {
  return composedPath.some(
    (eventTarget) =>
      eventTarget instanceof Node &&
      portalsContainerElement?.contains(eventTarget),
  );
}
