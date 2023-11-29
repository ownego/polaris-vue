import { inject, ref } from 'vue';

export default function useFocusManager() {
  const context = inject('focus-manager');
  return context;
}

export function useFocusManagerContext() {
  const trapFocusList = ref<string[]>([]);

  const add = (id: string) => {
    trapFocusList.value = [...trapFocusList.value, id];
  };

  const remove = (id: string) => {
    let removed = true;

    const clone = [...trapFocusList.value];
    const index = clone.indexOf(id);

    if (index === -1) {
      removed = false;
    } else {
      clone.splice(index, 1);
    }

    trapFocusList.value = clone;

    return removed;
  };

  return {
    add,
    remove,
    trapFocusList,
  }
}
