<template lang="pug">
Labelled(
  :id="id",
  :error="error",
  :action="labelAction",
  :labelHidden="labelHidden",
)
  template(#label, v-if="hasSlot(slots.label)")
    slot(name="label")
  template(#help-text, v-if="hasSlot(slots['help-text'])")
    slot(name="help-text")
  div(:class="classNames(styles.DualThumb, sharedStyles.RangeSlider)")
    div(v-if="slots.prefix", :class="styles.Prefix")
      slot(name="prefix")
    div(
      :class="trackWrapperClassName",
      ref="trackWrapper",
      @mousedown="handleMouseDownTrack",
    )
      div(
        :class="styles.Track",
        :style="cssVars",
        ref="track",
      )
      div(:class="styles['Track--dashed']")
      div(
        :id="idLower",
        :class="thumbLowerClassName",
        :style="{ left: `${leftPositionThumbLower}px` }",
        ref="thumbLower",
        role="slider",
        :aria-disabled="disabled",
        :aria-valuemin="min",
        :aria-valuemax="max",
        :aria-valuenow="value[0]",
        :aria-invalid="Boolean(error)",
        :aria-describedby="ariaDescribedBy",
        :aria-labelledby="labelID(id)",
        tabIndex="0",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @keydown="handleKeypressLower",
        @mousedown="handleMouseDownThumbLower",
        @touchstart="handleTouchStartThumbLower",
      )
      output(
        v-if="!disabled && output",
        :for="idUpper",
        :class="outputLowerClassName",
        :style="{ left: `${leftPositionThumbLower}px` }",
      )
        div(:class="styles.OutputBubble")
          span(:class="styles.OutputText") {{ value[0] }}
      div(
        :id="idUpper",
        :class="thumbUpperClassName",
        :style="{ left: `${leftPositionThumbUpper}px` }",
        role="slider",
        tabIndex="0",
        ref="thumbUpper",
        :aria-disabled="disabled",
        :aria-valuemin="min",
        :aria-valuemax="max",
        :aria-valuenow="value[1]",
        :aria-invalid="Boolean(error)",
        :aria-describedby="ariaDescribedBy",
        :aria-labelledby="labelID(id)",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @keydown="handleKeypressUpper",
        @mousedown="handleMouseDownThumbUpper",
        @touchstart="handleTouchStartThumbUpper",
      )
      output(
        v-if="!disabled && output",
        :for="idUpper",
        :class="outputUpperClassName",
        :style="{ left: `${leftPositionThumbUpper}px` }",
      )
        div(:class="styles.OutputBubble")
          span(:class="styles.OutputText") {{ value[1] }}
    div(v-if="slots.suffix", :class="styles.Suffix")
      slot(name="suffix")
EventListener(
  event="resize",
  :handler="setTrackPosition",
)
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useSlots } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { Labelled, EventListener } from '@/components';
import type { LabelledProps } from '@/components/Labelled/utils';
import type { ErrorType } from '@/utilities/type';
import { labelID } from '@/components/Label/utils';
import { Key } from '@/components/KeypressListener/utils';
import { hasSlot } from '@/utilities/has-slot';
import type { DualValue } from '../../types';

import sharedStyles from '@/classes/RangeSlider.json';
import styles from '@/classes/RangeSlider-DualThumb.json';

interface DualThumbProps {
  modelValue: DualValue;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for range input */
  id: string;
  /** Minimum possible value for range input */
  min: number;
  /** Maximum possible value for range input */
  max: number;
  /** Increment value for range input changes */
  step: number;
  /** Provide a tooltip while sliding, indicating the current value */
  output?: boolean;
  /** Display an error message */
  error?: ErrorType;
  /** Disable input */
  disabled?: boolean;
}

interface KeyHandlers {
  [key: string]: () => void;
}

const props = defineProps<DualThumbProps>();
const emits = defineEmits<{
  (e: 'input', value: DualValue, id: string): void;
  (e: 'update:modelValue', value: DualValue, id: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();
const slots = useSlots();

const value = ref(sanitizeValue(
  props.modelValue,
  props.min,
  props.max,
  props.step,
));

const trackWidth = ref(0);
const trackLeft = ref(0);

const track = ref<HTMLDivElement | null>(null);
const trackWrapper = ref<HTMLDivElement | null>(null);
const thumbLower = ref<HTMLDivElement | null>(null);
const thumbUpper = ref<HTMLDivElement | null>(null);

const setTrackPosition = debounce(
  () => {
    if (track.value) {
      const thumbSize = 16;

      const { width, left } = track.value.getBoundingClientRect();
      const adjustedTrackWidth = width - thumbSize;
      const adjustedTrackLeft = left + thumbSize / 2;

      const range = props.max - props.min;
      const minValuePosition = (props.min / range) * adjustedTrackWidth;

      trackWidth.value = adjustedTrackWidth;
      trackLeft.value = adjustedTrackLeft - minValuePosition;
    }
  },
  40,
  {leading: true, trailing: true, maxWait: 40},
);

const idLower = computed(() => props.id);
const idUpper = computed(() => `${props.id}Upper`);

const describedBy = ref<string[]>([]);

if (props.error) {
  describedBy.value.push(`${props.id}Error`);
}

const ariaDescribedBy = computed(() => describedBy.value.length ? describedBy.value.join(' ') : undefined);

const trackWrapperClassName = computed(() => classNames(
  styles.TrackWrapper,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

const thumbLowerClassName = computed(() => classNames(
  styles.Thumbs,
  // styles.ThumbLower,
  props.disabled && styles.disabled,
));

const thumbUpperClassName = computed(() => classNames(
  styles.Thumbs,
  // styles.ThumbUpper,
  props.disabled && styles.disabled,
));

const range = computed(() => props.max - props.min);
const minValuePosition = computed(() => (props.min / range.value) * trackWidth.value);

const leftPositionThumbLower = computed(() => (value.value[0] / range.value) * trackWidth.value - minValuePosition.value);
const leftPositionThumbUpper = computed(() => (value.value[1] / range.value) * trackWidth.value - minValuePosition.value);

const outputLowerClassName = computed(() => classNames(
  styles.Output,
  // styles.OutputLower,
));

const outputUpperClassName = computed(() => classNames(
  styles.Output,
  // styles.OutputUpper,
));

const cssVars = computed(() => {
  return {
    '--pc-range-slider-progress-lower': `${leftPositionThumbLower.value}px`,
    '--pc-range-slider-progress-upper': `${leftPositionThumbUpper.value}px`,
  } as any;
});

onMounted(() => {
  setTrackPosition();

  if (trackWrapper.value) {
    trackWrapper.value.addEventListener(
      'touchstart',
      handleTouchStartTrack,
      {passive: false},
    );
  }
});

onBeforeUnmount(() => {
  if (trackWrapper.value) {
    trackWrapper.value.removeEventListener(
      'touchstart',
      handleTouchStartTrack,
    );
  }
});

const handleMouseDownThumbLower = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) {
    return;
  }
  registerMouseMoveHandler(handleMouseMoveThumbLower);
  event.stopPropagation();
};

const handleMouseMoveThumbLower = (event: MouseEvent) => {
  const valueUpper = value.value[1];
  setValue(
    [actualXPosition(event.clientX), valueUpper],
    'Upper',
  );
};

const handleTouchStartThumbLower = (event: TouchEvent) => {
  if (props.disabled) {
    return;
  }
  registerTouchMoveHandler(handleTouchMoveThumbLower);
  event.stopPropagation();
};

const handleTouchMoveThumbLower = (event: TouchEvent) => {
  event.preventDefault();
  const valueUpper = value.value[1];
  setValue(
    [actualXPosition(event.touches[0].clientX), valueUpper],
    'Upper',
  );
};

const handleMouseDownThumbUpper = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) {
    return;
  }
  registerMouseMoveHandler(handleMouseMoveThumbUpper);
  event.stopPropagation();
};

const handleMouseMoveThumbUpper = (event: MouseEvent) => {
  const valueLower = value.value[0];
  setValue(
    [valueLower, actualXPosition(event.clientX)],
    'Lower',
  );
};

const handleTouchStartThumbUpper = (event: TouchEvent) => {
  if (props.disabled) {
    return;
  }

  registerTouchMoveHandler(handleTouchMoveThumbUpper);
  event.stopPropagation();
};

const handleTouchMoveThumbUpper = (event: TouchEvent) => {
  event.preventDefault();
  const valueLower = value.value[0];
  setValue(
    [valueLower, actualXPosition(event.touches[0].clientX)],
    'Lower',
  );
};

const handleKeypressLower = (event: KeyboardEvent) => {
  if (props.disabled) {
    return;
  }

  const handlerMap: KeyHandlers = {
    [Key.ArrowUp]: incrementValueLower,
    [Key.ArrowRight]: incrementValueLower,
    [Key.ArrowDown]: decrementValueLower,
    [Key.ArrowLeft]: decrementValueLower,
  };

  const handler = handlerMap[event.key];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
};

const handleKeypressUpper = (event: KeyboardEvent) => {
  if (props.disabled) {
    return;
  }

  const handlerMap: KeyHandlers = {
    [Key.ArrowUp]: incrementValueUpper,
    [Key.ArrowRight]: incrementValueUpper,
    [Key.ArrowDown]: decrementValueUpper,
    [Key.ArrowLeft]: decrementValueUpper,
  };

  const handler = handlerMap[event.key];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
};

const incrementValueLower = () => {
  setValue(
    [value.value[0] + props.step, value.value[1]],
    'Upper',
  );
};

const decrementValueLower = () => {
  setValue(
    [value.value[0] - props.step, value.value[1]],
    'Upper',
  );
};

const incrementValueUpper = () => {
  setValue(
    [value.value[0], value.value[1] + props.step],
    'Lower',
  );
};

const decrementValueUpper = () => {
  setValue(
    [value.value[0], value.value[1] - props.step],
    'Lower',
  );
};

const dispatchValue = () => {
  emits('input', value.value, props.id);
  emits('update:modelValue', value.value, props.id);
};

const setValue = (dirtyValue: DualValue, control: 'Upper' | 'Lower') => {
  const sanitizedValue = sanitizeValue(dirtyValue, props.min, props.max, props.step, control);
  if (!isTupleEqual(sanitizedValue, value.value)) {
    value.value = sanitizedValue;
    dispatchValue();
  }
};

const handleMouseDownTrack = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) {
    return;
  }

  event.preventDefault();
  const clickXPosition = actualXPosition(event.clientX);
  const distanceFromLowerThumb = Math.abs(value.value[0] - clickXPosition);
  const distanceFromUpperThumb = Math.abs(value.value[1] - clickXPosition);

  if (distanceFromLowerThumb <= distanceFromUpperThumb) {
    setValue([clickXPosition, value.value[1]], 'Upper');
    registerMouseMoveHandler(handleMouseMoveThumbLower);

    if (thumbLower.value) {
      thumbLower.value.focus();
    }
  } else {
    setValue([value.value[0], clickXPosition], 'Lower');
    registerMouseMoveHandler(handleMouseMoveThumbUpper);

    if (thumbUpper.value) {
      thumbUpper.value.focus();
    }
  }
};

const handleTouchStartTrack = (event: TouchEvent) => {
  if (props.disabled) {
    return;
  }

  event.preventDefault();
  const clickXPosition = actualXPosition(event.touches[0].clientX);
  const distanceFromLowerThumb = Math.abs(value.value[0] - clickXPosition);
  const distanceFromUpperThumb = Math.abs(value.value[1] - clickXPosition);

  if (distanceFromLowerThumb <= distanceFromUpperThumb) {
    setValue([clickXPosition, value.value[1]], 'Upper');
    registerTouchMoveHandler(handleTouchMoveThumbLower);

    if (thumbLower.value) {
      thumbLower.value.focus();
    }
  } else {
    setValue([value.value[0], clickXPosition], 'Lower');
    registerTouchMoveHandler(handleTouchMoveThumbUpper);

    if (thumbUpper.value) {
      thumbUpper.value.focus();
    }
  }
};

const actualXPosition = (dirtyXPosition: number): number => {
  if (track.value) {
    const {min, max} = props;

    const relativeX = dirtyXPosition - trackLeft.value;
    const percentageOfTrack = relativeX / trackWidth.value;

    return percentageOfTrack * (max - min);
  } else {
    return 0;
  }
};

function registerMouseMoveHandler(handler: (event: MouseEvent) => void) {
  document.addEventListener('mousemove', handler);
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', handler);
    },
    {once: true},
  );
}

function registerTouchMoveHandler(handler: (event: TouchEvent) => void) {
  const removeHandler = () => {
    document.removeEventListener('touchmove', handler);
    document.removeEventListener('touchend', removeHandler);
    document.removeEventListener('touchcancel', removeHandler);
  };

  document.addEventListener('touchmove', handler, {passive: false});
  document.addEventListener('touchend', removeHandler, {once: true});
  document.addEventListener('touchcancel', removeHandler, {once: true});
}

function sanitizeValue(
  mainValue: DualValue,
  min: number,
  max: number,
  step: number,
  control = 'Upper',
): DualValue {
  let upperValue = inBoundsUpper(roundedToStep(mainValue[1]));
  let lowerValue = inBoundsLower(roundedToStep(mainValue[0]));
  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;

  if (control === 'Upper' && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === 'Lower' && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }

  return [lowerValue, upperValue];

  function inBoundsUpper(tmpValue: number): number {
    const lowerMin = min + step;

    if (tmpValue < lowerMin) {
      return lowerMin;
    } else if (tmpValue > max) {
      return max;
    } else {
      return tmpValue;
    }
  }

  function inBoundsLower(tmpValue: number): number {
    const upperMax = max - step;

    if (tmpValue < min) {
      return min;
    } else if (tmpValue > upperMax) {
      return upperMax;
    } else {
      return tmpValue;
    }
  }

  function roundedToStep(tmpValue: number) {
    return Math.round(tmpValue / step) * step;
  }
}

function isTupleEqual(a?: DualValue, b?: DualValue) {
  if (a == null || b == null) {
    return false;
  }

  return a[0] === b[0] && a[1] === b[1];
}
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/RangeSlider/components/DualThumb/DualThumb.scss';
</style>
