import useId from './useId';
import {
  type Ref,
  inject,
  ref,
  computed,
  watch,
  onUnmounted,
} from 'vue';

interface Options {
  trapping: boolean;
}
interface FocusManagerContextType {
  trapFocusList: Ref<string[]>;
  add: (id: string) => void;
  remove: (id: string) => boolean;
}

export function useFocusManager({ trapping }: Options) {
  const context = inject<FocusManagerContextType>('focus-manager');
  const id = useId();

  if (!context) {
    throw new Error('No FocusManager was provided.');
  }

  const {
    trapFocusList,
    add: addFocusItem,
    remove: removeFocusItem,
  } = context; 

  const canSafelyFocus = computed(() => trapFocusList.value[0] === String(id));

  watch(
    () => [trapping, id],
    ([newTrappingVal, newId]) => {
      if (!newTrappingVal) {
        return;
      }

      addFocusItem(String(newId));
    },
    { immediate: true }
);

  onUnmounted(() => {
    removeFocusItem(String(id));
  });

  return { canSafelyFocus };
}

export function useFocusManagerContext(): FocusManagerContextType {
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
