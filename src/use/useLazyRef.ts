import { type Ref, ref } from 'vue';

const UNIQUE_IDENTIFIER = Symbol('unique_identifier');

export function useLazyRef<T>(initialValue: () => T) {
  const lazyRef: Ref<T | typeof UNIQUE_IDENTIFIER> = ref(UNIQUE_IDENTIFIER);

  if (lazyRef.value === UNIQUE_IDENTIFIER) {
    lazyRef.value = initialValue();
  }

  return lazyRef;
}
