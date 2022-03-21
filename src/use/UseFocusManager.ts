import { computed, inject, onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue';
import { MissingAppProviderError } from '@/utilities/errors';
import type { FocusManager } from '@/utilities/focus-manager';
import UseUniqueId from './UseUniqueId';

export default function UseFocusManager(props) {
  const focusManager = inject('focusManager') as FocusManager;

  const { useUniqueId, uniqueIdRef } = UseUniqueId();

  watch([() => props.trapping], () => {
    if (props.trapping && uniqueIdRef) {
      focusManager.add(uniqueIdRef.value);
    }
  });

  const canSafelyFocus = computed(() => {
    return focusManager.trapFocusList[0] === uniqueIdRef.value;
  });

  onBeforeMount(() => {
    if (!focusManager) {
      throw new MissingAppProviderError('No FocusManager was provided.');
    }
  });

  onMounted(() => {
    const id = useUniqueId();

    if (props.trapping) {
      focusManager.add(id);
    }
  });

  onBeforeUnmount(() => {
    if (uniqueIdRef.value) {focusManager.remove(uniqueIdRef.value);}
  });

  return { canSafelyFocus };
}
