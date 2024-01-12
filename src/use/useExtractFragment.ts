import { computed } from 'vue';
import type { VNode, VNodeArrayChildren } from 'vue';

/**
 * Extracts the children of a fragment.
 * Note: This is a workaround to fix the issue with Vue 3 fragments.
 *    By the way for now, in mostly cases, we can loop over the children of a slot, then use <component :is>
 *    to render the children.
 *
 * @returns {extractElement} A function that returns the children of a fragment.
 * @returns {slotsElms} All the children of a fragment and the fragment itself, in this case fragment is the slot.
 */
export function useExtractFragment(slot?: any) {
  const slotsElms = computed(() => {
    let elm: VNodeArrayChildren = [];
    if (slot) {
      const groups = slot().map((group: VNode) => {
        if (group.children && group.children.length) {
          return extractElement(group);
        }

        return group;
      })

      elm = groups.flat();
    }

    return elm;
  });

  const isFragment = (item: any) => {
    return item.type?.toString() === 'Symbol(Fragment)' || item.type?.toString() === 'Symbol()'
      || item.type?.toString() === 'Symbol(v-fgt)'; // this check is for Slots type in Vue 3
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
    slotsElms,
    extractElement,
  };
}
