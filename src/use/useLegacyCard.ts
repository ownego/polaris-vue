import { ref, onMounted } from 'vue';
import styles from '@polaris/components/LegacyCard/LegacyCard.module.css';

export function useLegacyCardPaddingObserverRef() {
  const legacyCard = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    const legacyCardNode = legacyCard.value;
    let firstSection: Element | undefined;
    let lastSection: Element | undefined;

    if (legacyCardNode) {
      const updateFirstAndLastSectionPadding = () => {
        // Reset old first and last section padding
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);

        // Get current first and last sections, return if they don't exist
        const currentElements = legacyCardNode.querySelectorAll(
          `.${styles.Section}, .${styles.Header}, .${styles.Footer}`,
        );
        if (!currentElements?.length) return;

        const firstElement = currentElements[0];
        const lastElement = currentElements[currentElements.length -1];

        // Update padding for first element if it is the first child or
        // a descendant of the first child
        if (legacyCardNode.firstElementChild?.contains(firstElement)) {
          firstSection = firstElement;
          updatePadding(firstSection, 'top', true);
        }

        // Update padding for last element if it is the last child or
        // a descendant of the last child
        if (legacyCardNode.lastElementChild?.contains(lastElement)) {
          lastSection = lastElement;
          updatePadding(lastSection, 'bottom', true);
        }
      };

      // First initial render
      updateFirstAndLastSectionPadding();

      // Re-run when descendants are changed
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode, {
        childList: true,
        subtree: true,
      });

      return () => {
        // Clean up by removing added classes
        updatePadding(firstSection, 'top', false);
        updatePadding(lastSection, 'bottom', false);
        observer.disconnect();
      };
    }
  });

  return legacyCard;
}

function updatePadding(
  element: Element | undefined,
  area: 'top' | 'bottom',
  add: boolean,
) {
  if (!element || element.className.includes(styles['Section-flush'])) return;

  switch (area) {
    case 'top':
      (element as HTMLElement).classList.toggle(
        styles.FirstSectionPadding,
        add,
      );
      return;
    case 'bottom':
      (element as HTMLElement).classList.toggle(
        styles.LastSectionPadding, add
      );
  }
}
