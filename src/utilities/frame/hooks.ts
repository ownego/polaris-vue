import { inject } from 'vue';
import type { FrameContextType } from './context';
import { MissingFrameError } from '../errors';

export default function UseFrame() {
  const frame = inject('frameContext', {}) as FrameContextType;

  function useFrame() {
    if (!frame) {
      throw new MissingFrameError('No frame context was provided.');
    }

    return frame;
  }

  return { useFrame };
}
