import type { Slot } from 'vue';

export function hasSlot (slot?: Slot) {
  if (!slot) { return false; }

  if (slot && slot()[0].children) {
    if (typeof slot()[0].children === 'string') {
      return slot()[0].children !== 'v-if';
    }

    if (Array.isArray(slot()[0].children)) {
      return (slot()[0].children as []).length > 0;
    }
  }

  return true;
}
