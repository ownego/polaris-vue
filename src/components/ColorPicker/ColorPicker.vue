<template lang="pug">
div(
  :id="id",
  :class="className",
  @mousedown.prevent="handlePickerDrag",
)
  div(
    ref="mainColorRef",
    :class="styles.MainColor",
  )
    div(
      :class="styles.ColorLayer",
      :style="{ backgroundColor: colorString }",
    ) &nbsp;
    Slidable(
      :draggerX="draggerX",
      :draggerY="draggerY",
      @change="handleDraggerMove",
    )
  HuePicker(
    :hue="colorHsb.hue",
    @change="handleHueChange",
  )
  AlphaPicker(
    v-if="allowAlpha",
    :alpha="alpha",
    :color="colorHsb",
    @change="handleAlphaChange",
  )
  EventListener(
    event="resize",
    :handler="handleResize",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import debounce from 'lodash/debounce';
import { classNames } from 'polaris-react/src/utilities/css';
import { clamp } from 'polaris-react/src/utilities/clamp';
import type { HSBColor, HSBAColor, RGBAColor } from 'polaris-react/src/utilities/color-types';
import {
  hsbToRgb,
  hsbToHex,
  hexToRgb,
  rgbToHsb,
} from '@/utilities/color-transformers';
import styles from '@/classes/ColorPicker.json';
import { AlphaPicker, HuePicker, Slidable } from './components';
import { EventListener } from '../EventListener';

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

const RESIZE_DEBOUNCE_TIME_MS = 200;

interface Props {
  /** ID for the element */
  id?: string;
  /**
   * The currently selected color.
   * The color can be HSB object (same with Shopify) or RGB, Hex string
   */
  modelValue: Color | string;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Allow HuePicker to take the full width */
  fullWidth?: boolean;
  /** Color output format */
  outputType?: 'hsb' | 'rgb' | 'hex';
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'change', value: Color | string): void
  (event: 'update:modelValue', value: Color | string): void
}>();

const mainColorRef = ref(null);

// Default input color
const colorHsb = reactive<Color>({
  hue: 0,
  saturation: 0,
  brightness: 0,
  alpha: 1,
});

const pickerSize = reactive({ width: 0, height: 0 });

const handlePickerDrag = (event: MouseEvent) => {
  // prevents external elements from being selected
  event.preventDefault();
};

const className = computed(() => {
  return classNames(
    styles.ColorPicker,
    props.fullWidth && styles.fullWidth,
  );
});

const alpha = computed(() => {
  return colorHsb.alpha !== undefined && props.allowAlpha ? colorHsb.alpha : 1;
});

const colorString = computed(() => {
  const { red, green, blue } = hsbToRgb({
    hue: colorHsb.hue,
    saturation: 1,
    brightness: 1,
  });

  return `rgba(${red}, ${green}, ${blue}, ${alpha.value})`;
});

const draggerX = computed(() => {
  return clamp(colorHsb.saturation * pickerSize.width, 0, pickerSize.width);
});

const draggerY = computed(() => {
  return clamp(
    pickerSize.height - colorHsb.brightness * pickerSize.height,
    0,
    pickerSize.height,
  );
})

const outputColor = computed(() => {
  if (props.outputType === 'hex') {
    return hsbToHex(colorHsb);
  }

  if (props.outputType === 'rgb') {
    const rgbColor = hsbToRgb(colorHsb);
    return `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}, ${alpha.value})`;
  }

  return colorHsb;
});

const handleResize = debounce(
  () => {
    if (mainColorRef.value) {
      pickerSize.width = (mainColorRef.value as HTMLElement).clientWidth;
      pickerSize.height = (mainColorRef.value as HTMLElement).clientHeight;
    }
  },
  RESIZE_DEBOUNCE_TIME_MS,
  { leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS },
);

/**
 * CREATED()
 * Set the initial color
 * The input color maybe Hex or RGB
 * Convert it to hsb
 */

// Default hsb
if (typeof props.modelValue === 'object') {
  Object.assign(colorHsb, props.modelValue);
}

// Hex or RGB
if (typeof props.modelValue === 'string') {
  let colorRgb: RGBAColor;

  // Convert from hex to rgba object
  if (/#[0-9abcdef]{3,6}/.test(props.modelValue)) {
    colorRgb = { ...hexToRgb(props.modelValue), alpha: 1 };
  } else {
    // Convert from rgba string to object
    const colorRgbArr = props.modelValue.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    colorRgb = {
      red: parseInt(colorRgbArr[0], 10),
      green: parseInt(colorRgbArr[1], 10),
      blue: parseInt(colorRgbArr[2], 10),
      alpha: colorRgbArr[2] ? parseFloat(colorRgbArr[3]) : 1,
    };
  }

  Object.assign(colorHsb, { ...rgbToHsb(colorRgb), alpha: colorRgb.alpha });
}

onMounted(() => {
  if (mainColorRef.value) {
    pickerSize.width = (mainColorRef.value as HTMLElement).clientWidth;
    pickerSize.height = (mainColorRef.value as HTMLElement).clientHeight;
  }
});

const handleHueChange = (hue: number) => {
  colorHsb.hue = hue;
  emits('change', outputColor.value);
  emits('update:modelValue', outputColor.value);
}

const handleAlphaChange = (value: number) => {
  colorHsb.alpha = value;
  emits('change', outputColor.value);
  emits('update:modelValue', outputColor.value);
}

const handleDraggerMove = ({ x, y }: { x: number, y: number }): void => {
  colorHsb.saturation = clamp(x / pickerSize.width, 0, 1);
  colorHsb.brightness = clamp(1 - y / pickerSize.height, 0, 1);
  emits('change', outputColor.value);
  emits('update:modelValue', outputColor.value);
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/ColorPicker/ColorPicker.scss';
</style>
