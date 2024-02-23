import { ref } from 'vue';
import { useEventListener } from './use-event-listener';

export function useIsTouchDevice() {
  const isTouchDevice = ref(false);

  const handleTouchStart = () => {
    isTouchDevice.value = true;
  };

  useEventListener('touchstart', handleTouchStart);

  return isTouchDevice;
}
