import type { VNodeArrayChildren } from 'vue';

/**
 * Extracts the children of a fragment.
 * Note: This is a workaround to fix the issue with Vue 3 fragments.
 *    By the way for now, in mostly cases, we can loop over the children of a slot, then use <component :is>
 *    to render the children.
 *
 * @returns {extractElement} A function that returns the children of a fragment.
 */
export function useExtractFragment() {
  const isFragment = (item: any) => {
    return item.type.toString() === 'Symbol(Fragment)' || item.type.toString() === 'Symbol()';
  }

  const extractElement = (elm: any) => {
    if (!isFragment(elm)) {
      return [elm];
    }

    const children = elm.children as VNodeArrayChildren;
    const items: VNodeArrayChildren = [];
    for (const child of children) {
      if (isFragment(child)) {
        items.push(...extractElement(child));
      } else {
        items.push(child);
      }
    }
    return items;
  }

  return {
    extractElement,
  };
}
