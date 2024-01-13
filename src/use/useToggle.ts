import { ref } from 'vue';

export function useToggle(initialState?: boolean) {
  const value = ref(initialState || false);

  const toggle = () => {
    value.value = !value.value;
  };

  const setTrue = () => {
    value.value = true;
  }

  const setFalse = () => {
    value.value = false;
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse
  };
}
