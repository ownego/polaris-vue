<template lang="pug">
Labelled(
  :id="id",
  :error="error",
  :action="labelAction",
  :label-hidden="labelHidden"
)
  template(v-if="hasLabel", #label)
    slot(v-if="slots.label", name="label")
    template(v-else) {{ label }}

  template(v-if="hasHelpText", #helpText)
    slot(v-if="slots.helpText", name="helpText")
    template(v-else) {{ helpText }}

  div(:class="classNames(styles.DualThumb, sharedStyles.RangeSlider)")
    div(v-if="hasPrefix", :class="styles.Prefix")
      slot(v-if="slots.prefix", name="prefix")
      template(v-else) {{ prefix }}

    div(
      ref="trackWrapper",
      :class="trackWrapperClassName",
      @mousedown="handleMouseDownTrack",
    )
      div(:class="styles.Track", :style="cssVars", ref="track")
      div(:class="styles['Track--dashed']")
      div(
        ref="thumbLower",
        :id="idLower",
        :class="thumbLowerClassName",
        :style="{ left: `${leftPositionThumbLower}px` }",
        role="slider",
        :aria-disabled="disabled",
        :aria-valuemin="min",
        :aria-valuemax="max",
        :aria-valuenow="model[0]",
        :aria-invalid="Boolean(error)",
        :aria-describedby="ariaDescribedBy",
        :aria-labelledby="labelId(id)",
        tabindex="0",
        @focus="emits('focus')",
        @blur="emits('blur')",
        @keydown="handleKeypressLower",
        @mousedown="handleMouseDownThumbLower",
        @touchstart="handleTouchStartThumbLower",
      )
      output(
        v-if="!disabled && output",
        :for="idLower",
        :class="outputLowerClassName",
        :style="{ left: `${leftPositionThumbLower}px` }",
      )
        div(:class="styles.OutputBubble")
          Text(
            as="span",
            variant="headingSm",
            alignment="center",
          ) {{ model[0] }}

      div(
        ref="thumbUpper",
        :id="idUpper",
        :class="thumbUpperClassName",
        :style="{ left: `${leftPositionThumbUpper}px` }",
        role="slider",
        :aria-disabled="disabled",
        :aria-valuemin="min",
        :aria-valuemax="max",
        :aria-valuenow="model[1]",
        :aria-invalid="Boolean(error)",
        :aria-describedby="ariaDescribedBy",
        :aria-labelledby="labelId(id)",
        tabindex="0",
        @focus="emits('focus')",
        @blur="emits('blur')",
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
          Text(
            as="span",
            variant="headingSm",
            alignment="center",
          ) {{ model[1] }}

    div(v-if="hasSuffix", :class="styles.Suffix")
      slot(v-if="slots.suffix", name="suffix")
      template(v-else) {{ suffix }}
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { classNames } from '@/utilities/css';
import type {
  DualValue,
  RangeSliderProps,
  RangeSliderSlots,
  RangeSliderEvents,
} from '../../types';
import { Labelled, Text } from '@/components';
import { labelId } from '@/components/Label/utils';
import { Key } from '@/utilities/types';
import { useEventListener } from '@/utilities/use-event-listener';
import { useHasSlot } from '@/use/useHasSlot';

import sharedStyles from '@polaris/components/RangeSlider/RangeSlider.module.scss';
import styles from '@polaris/components/RangeSlider/components/DualThumb/DualThumb.module.scss';

export type DualThumbProps = RangeSliderProps & {
  id: string;
  min: number;
  max: number;
  step: number;
}

interface KeyHandlers {
  [key: string]: () => void;
}

enum Control {
  Lower,
  Upper,
}

const props = defineProps<DualThumbProps>();
const slots = defineSlots<RangeSliderSlots>();
const emits = defineEmits<RangeSliderEvents>();

const { hasSlot } = useHasSlot();

const model = defineModel<DualValue>({
  required: true,
});

const trackWidth = ref(0);
const trackLeft = ref(0);
const thumbLower = ref<HTMLDivElement | null>(null);
const thumbUpper = ref<HTMLDivElement | null>(null);
const track = ref<HTMLDivElement | null>(null);
const trackWrapper = ref<HTMLDivElement | null>(null);

const idLower = computed(() => props.id);
const idUpper = computed(() => `${props.id}Upper`);

const ariaDescribedBy = computed(() => {
  const describedBy = [];

  if (props.error) {
    describedBy.push(`${props.id}Error`);
  }

  return describedBy.length ? describedBy.join(' ') : undefined;
});

const trackWrapperClassName = computed(() => classNames(
  styles.TrackWrapper,
  props.error && styles.error,
  props.disabled && styles.disabled,
));

const thumbLowerClassName = computed(() => classNames(
  styles.Thumbs,
  styles.ThumbLower,
  props.disabled && styles.disabled,
));

const thumbUpperClassName = computed(() => classNames(
  styles.Thumbs,
  styles.ThumbUpper,
  props.disabled && styles.disabled,
));

const range = computed(() => props.max - props.min);
const minValuePosition = computed(() => (props.min / range.value) * trackWidth.value);

const leftPositionThumbLower = computed(() => (
  (model.value[0] / range.value) * trackWidth.value) - minValuePosition.value
);
const leftPositionThumbUpper = computed(() => (
  (model.value[1] / range.value) * trackWidth.value) - minValuePosition.value
);

const outputLowerClassName = computed(() => classNames(styles.Output, styles.OutputLower));
const outputUpperClassName = computed(() => classNames(styles.Output, styles.OutputUpper));

const cssVars = computed(() => ({
  '--pc-range-slider-progress-lower': `${leftPositionThumbLower.value}px`,
  '--pc-range-slider-progress-upper': `${leftPositionThumbUpper.value}px`,
}));

const hasLabel = computed(() => hasSlot(slots.label) || props.label);
const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);
const hasPrefix = computed(() => hasSlot(slots.prefix) || props.prefix);
const hasSuffix = computed(() => hasSlot(slots.suffix) || props.suffix);

onMounted(() => {
  setTrackPosition();

  if (trackWrapper.value) {
    trackWrapper.value.addEventListener('touchstart', handleTouchStartTrack, { passive: false });
  }
});

onBeforeUnmount(() => {
  if (trackWrapper.value) {
    trackWrapper.value.removeEventListener('touchstart', handleTouchStartTrack);
  }
});

/**
 * Methods
 */
const setTrackPosition = debounce(
  () => {
    if (track.value) {
      const thumbSize = 16;

      const {width, left} = track.value.getBoundingClientRect();
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

useEventListener('resize', setTrackPosition);

const handleMouseDownThumbLower = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) return;
  registerMouseMoveHandler(handleMouseMoveThumbLower);
  event.stopPropagation();
};

const handleMouseMoveThumbLower = (event: MouseEvent) => {
  const valueUpper = model.value[1];

  setValue(
    [actualXPosition(event.clientX), valueUpper],
    Control.Upper,
  );
};

const handleTouchStartThumbLower = (event: TouchEvent) => {
  if (props.disabled) return;
  registerTouchMoveHandler(handleTouchMoveThumbLower);
  event.stopPropagation();
};

const handleTouchMoveThumbLower = (event: TouchEvent) => {
  event.preventDefault();
  const valueUpper = model.value[1];

  setValue(
    [actualXPosition(event.touches[0].clientX), valueUpper],
    Control.Upper,
  );
};

const handleMouseDownThumbUpper = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) return;
  registerMouseMoveHandler(handleMouseMoveThumbUpper);
  event.stopPropagation();
};

const handleMouseMoveThumbUpper = (event: MouseEvent) => {
  const valueLower = model.value[0];

  setValue(
    [valueLower, actualXPosition(event.clientX)],
    Control.Lower,
  );
};

const handleTouchStartThumbUpper = (event: TouchEvent) => {
  if (props.disabled) return;
  registerTouchMoveHandler(handleTouchMoveThumbUpper);
  event.stopPropagation();
};

const handleTouchMoveThumbUpper = (event: TouchEvent) => {
  event.preventDefault();
  const valueLower = model.value[0];
  setValue(
    [valueLower, actualXPosition(event.touches[0].clientX)],
    Control.Lower,
  );
};

const handleKeypressLower = (event: KeyboardEvent) => {
  if (props.disabled) return;

  const handlerMap: KeyHandlers = {
    [Key.UpArrow]: incrementValueLower,
    [Key.RightArrow]: incrementValueLower,
    [Key.DownArrow]: decrementValueLower,
    [Key.LeftArrow]: decrementValueLower,
  };

  const handler = handlerMap[event.keyCode];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
};

const handleKeypressUpper = (event: KeyboardEvent) => {
  if (props.disabled) return;

  const handlerMap: KeyHandlers = {
    [Key.UpArrow]: incrementValueUpper,
    [Key.RightArrow]: incrementValueUpper,
    [Key.DownArrow]: decrementValueUpper,
    [Key.LeftArrow]: decrementValueUpper,
  };

  const handler = handlerMap[event.keyCode];

  if (handler != null) {
    event.preventDefault();
    event.stopPropagation();
    handler();
  }
};

const incrementValueLower = () => {
  setValue(
    [model.value[0] + props.step, model.value[1]],
    Control.Upper,
  );
};

const decrementValueLower = () => {
  setValue(
    [model.value[0] - props.step, model.value[1]],
    Control.Upper,
  );
};

const incrementValueUpper = () => {
  setValue(
    [model.value[0], model.value[1] + props.step],
    Control.Lower,
  );
};

const decrementValueUpper = () => {
  setValue(
    [model.value[0], model.value[1] - props.step],
    Control.Lower,
  );
};

const dispatchValue = () => {
  emits('change', model.value, props.id);
};

const setValue = (dirtyValue: DualValue, control: Control) => {
  const sanitizedValue = sanitizeValue(dirtyValue, props.min, props.max, props.step, control);
  if (isTupleEqual(sanitizedValue, model.value) === false) {
    model.value = sanitizedValue;
    dispatchValue();
  }
};

const handleMouseDownTrack = (event: MouseEvent) => {
  if (event.button !== 0 || props.disabled) return;
  event.preventDefault();
  const clickXPosition = actualXPosition(event.clientX);

  const distanceFromLowerThumb = Math.abs(model.value[0] - clickXPosition);
  const distanceFromUpperThumb = Math.abs(model.value[1] - clickXPosition);

  if (distanceFromLowerThumb <= distanceFromUpperThumb) {
    setValue([clickXPosition, model.value[1]], Control.Upper);
    registerMouseMoveHandler(handleMouseMoveThumbLower);

    if (thumbLower.value) {
      thumbLower.value.focus();
    }
  } else {
    setValue([model.value[0], clickXPosition], Control.Lower);
    registerMouseMoveHandler(handleMouseMoveThumbUpper);

    if (thumbUpper.value) {
      thumbUpper.value.focus();
    }
  }
};

const handleTouchStartTrack = (event: TouchEvent) => {
  if (props.disabled) return;
  event.preventDefault();
  const clickXPosition = actualXPosition(event.touches[0].clientX);

  const distanceFromLowerThumb = Math.abs(model.value[0] - clickXPosition);
  const distanceFromUpperThumb = Math.abs(model.value[1] - clickXPosition);

  if (distanceFromLowerThumb <= distanceFromUpperThumb) {
    setValue([clickXPosition, model.value[1]], Control.Upper);
    registerTouchMoveHandler(handleTouchMoveThumbLower);

    if (thumbLower.value) {
      thumbLower.value.focus();
    }
  } else {
    setValue([model.value[0], clickXPosition], Control.Lower);
    registerTouchMoveHandler(handleTouchMoveThumbUpper);

    if (thumbUpper.value) {
      thumbUpper.value.focus();
    }
  }
};

const actualXPosition = (dirtyXPosition: number): number => {
  if (track.value) {
    const relativeX = dirtyXPosition - trackLeft.value;
    const percentageOfTrack = relativeX / trackWidth.value;

    return percentageOfTrack * (props.max - props.min);
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
  value: DualValue,
  min: number,
  max: number,
  step: number,
  control = Control.Upper,
): DualValue {
  let upperValue = inBoundsUpper(roundedToStep(value[1]));
  let lowerValue = inBoundsLower(roundedToStep(value[0]));
  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;

  if (control === Control.Upper && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === Control.Lower && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }

  return [lowerValue, upperValue];

  function inBoundsUpper(value: number): number {
    const lowerMin = min + step;

    if (value < lowerMin) {
      return lowerMin;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  function inBoundsLower(value: number): number {
    const upperMax = max - step;

    if (value < min) {
      return min;
    } else if (value > upperMax) {
      return upperMax;
    } else {
      return value;
    }
  }

  function roundedToStep(value: number) {
    return Math.round(value / step) * step;
  }
}

function isTupleEqual(a?: DualValue, b?: DualValue) {
  if (a == null || b == null) {
    return false;
  }

  return a[0] === b[0] && a[1] === b[1];
}
</script>
