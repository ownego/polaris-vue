import { inject } from 'vue';
import { defaultAllowMultiple } from './utils';

export interface DropZoneContextType {
  disabled: boolean;
  focused: boolean;
  measuring: boolean;
  allowMultiple: boolean;
  size: string;
  type: string;
}

export default function UseDropZoneContext() {
  const context = inject('dropZoneContext', {}) as DropZoneContextType;

  function useDropZoneContext() {
    if (!context) {
      throw new Error('No Drop Zone context was provided.');
    }

    return context;
  }

  return { useDropZoneContext };
}
