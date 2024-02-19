import { watch } from 'vue';

export function useOnValueChange<T>(
  value: T,
  onChange: (value: T, oldValue: T) => void,
) {
  watch(
    () => value,
    (oldValue, newValue) => {
      if (newValue !== oldValue) {
        onChange(newValue, oldValue);
      }
    }
  );
}
