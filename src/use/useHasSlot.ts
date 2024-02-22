import type { Slot, VNode } from 'vue';

/**
 * Checks if a slot is not empty.
 *
 * @returns {hasSlot} A function that returns true if the slot is not empty.
 */
export function useHasSlot() {
  const hasSlot = (slot?: Slot) => {
    if (!slot) {
      return false;
    }

    if (slot && slot()[0].children) {
      if (typeof slot()[0].children === 'string') {
        return slot()[0].children !== 'v-if';
      }

      if (Array.isArray(slot()[0].children)) {
        return (slot()[0].children as []).length > 0;
      }
    }

    return true;
  };

  const hasContent = (node: VNode) => {
    return node.type.toString() !== 'Symbol(v-cmt)';
  };

  const isSlotContainHtml = (slot?: Slot) => {
    if (!slot) {
      return false;
    }

    // More than 2 elements => it's HTML tag
    if (slot().length > 1) {
      return true;
    }

    // The only element is not Text or null Symbol
    if (slot()[0]
      && slot()[0].type.toString() !== 'Symbol(Text)'
      && slot()[0].type.toString() !== 'Symbol(v-txt)'
      && slot()[0].type.toString() !== 'Symbol()'
    ) {
      return true;
    }

    return false;
  };

  return {
    hasSlot,
    hasContent,
    isSlotContainHtml,
  }
}
