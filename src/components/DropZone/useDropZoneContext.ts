import { inject, toRefs, toRef, type Ref, reactive } from 'vue';
import { defaultAllowMultiple } from './utils';

export interface DropZoneContextType {
  disabled: boolean;
  focused: Ref<boolean>;
  measuring: Ref<boolean>;
  allowMultiple: boolean;
  size: Ref<string>;
  type: string;
}

export const DropZoneContext = reactive<DropZoneContextType>({
  disabled: false,
  focused: toRef(false),
  size: toRef('extraLarge'),
  type: 'file',
  measuring: toRef(false),
  allowMultiple: defaultAllowMultiple,
});

export function useDropZoneContext() {
  const context = inject('dropZoneContext', DropZoneContext);
  return toRefs(context);
}
