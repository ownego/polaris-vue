import { getCurrentInstance } from 'vue';

export default function useId() {
  const currentInstance = getCurrentInstance();

  if (!currentInstance) {
    throw new Error('useId must be called within a component.'); 
  }

  return currentInstance.uid;
}
