<template lang="pug">
div(
  :class="className",
  :id="id",
  @mousedown="handlePickerDrag"
)
  div(ref="colorNode", :class="styles.MainColor")
    div(
      :class="styles.ColorLayer",
      :style="{ backgroundColor: colorString }"
    )
    Slidable(
      :draggerX="draggerX",
      :draggerY="draggerY",
      @change="handleDraggerMove",
    )
  HuePicker(
    ref="huePickerRef",
    :hue="colorHsb.hue",
    @change="handleHueChange",
  )
  AlphaPicker(
    v-if="allowAlpha",
    :alpha="alpha",
    :color="colorHsb",
    @change="handleAlphaChange",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, reactive, ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { clamp } from '@polaris/utilities/clamp';
import { classNames } from '@/utilities/css';
import type { HSBColor, HSBAColor, RGBAColor } from '@polaris/utilities/color-types';
import {
  hsbToRgb,
  hsbToHex,
  hexToRgb,
  rgbToHsb,
} from '@/utilities/color-transformers';
import { AlphaPicker, HuePicker, Slidable } from './components';
import styles from '@polaris/components/ColorPicker/ColorPicker.module.css';

interface Color extends HSBColor {
  /** Level of transparency */
  alpha?: HSBAColor['alpha'];
}

export type ColorPickerProps = {
  /** ID for the element */
  id?: string;
  /** Allow user to select an alpha value */
  allowAlpha?: boolean;
  /** Allow HuePicker to take the full width */
  fullWidth?: boolean;
  /** Color output format */
  output?: 'hsb' | 'rgb' | 'hex';
}

type ColorPickerEvents = {
  /** Callback when color is selected */
  'change': [color: HSBAColor | string];
}

const props = defineProps<ColorPickerProps>();
const emits = defineEmits<ColorPickerEvents>();

const RESIZE_DEBOUNCE_TIME_MS = 200;

const model = defineModel<Color | string>();

const pickerSize = reactive<{
  width: number;
  height: number;
}>({ width: 0, height: 0 });

const colorHsb = reactive<HSBAColor>({
  hue: 0,
  saturation: 0,
  brightness: 0,
  alpha: 1,
});

const colorNode = ref<HTMLElement | null>(null);
const observer = ref<ResizeObserver | null>(null);
const huePickerRef = ref<HTMLElement | null>(null);

const draggerX = computed(() => clamp(colorHsb.saturation * pickerSize.width, 0, pickerSize.width));
const draggerY = computed(() => clamp(pickerSize.height - (colorHsb.brightness * pickerSize.height), 0, pickerSize.height));

const alpha = computed(() => {
  return colorHsb.alpha !== undefined && props.allowAlpha ? colorHsb.alpha : 1;
});

const outputColor = computed<HSBAColor | string>(() => {
  if (props.output === 'hex') {
    return hsbToHex(colorHsb);
  }

  if (props.output === 'rgb') {
    const rgbColor = hsbToRgb(colorHsb);
    return `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue}, ${alpha.value})`;
  }

  return colorHsb;
});

const className = classNames(
  styles.ColorPicker,
  props.fullWidth && styles.fullWidth,
);

const colorString = computed(() => {
  const { red, green, blue } = hsbToRgb({
    hue: colorHsb.hue,
    saturation: 1,
    brightness: 1,
  });

  return `rgba(${red}, ${green}, ${blue}, ${alpha.value})`;
});

/**
 * Initialize
 * Convert hex & rgba to hsb
 */
// HSB populate
if (typeof model.value === 'object') {
  colorHsb.alpha = model.value.alpha || 1;
  colorHsb.hue = model.value.hue;
  colorHsb.saturation = model.value.saturation;
  colorHsb.brightness = model.value.brightness;
}
// Hex / RGBA populate
if (typeof model.value === 'string') {
  let colorRgb: RGBAColor;

  // Convert from hex to rgba object
  if (/#[0-9abcdef]{3,6}/.test(model.value?.toLowerCase())) {
    colorRgb = { ...hexToRgb(model.value), alpha: 1 };
  } else {
    // Convert from rgba string to object
    const colorRgbArr = model.value.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
    colorRgb = {
      red: parseInt(colorRgbArr[0], 10),
      green: parseInt(colorRgbArr[1], 10),
      blue: parseInt(colorRgbArr[2], 10),
      alpha: parseFloat(colorRgbArr[3]) ? parseFloat(colorRgbArr[3]) : 1,
    };
  }

  Object.assign(colorHsb, { ...rgbToHsb(colorRgb), alpha: colorRgb.alpha });
}

onMounted(() => {
  if (!colorNode.value) {
    return;
  }

  observer.value = new ResizeObserver(handleResize);
  observer.value.observe(colorNode.value);

  pickerSize.width = colorNode.value.clientWidth;
  pickerSize.height = colorNode.value.clientHeight;
});

const handleResize = debounce(() => {
  if (!colorNode.value) {
    return;
  }

  pickerSize.width = colorNode.value.clientWidth;
  pickerSize.height = colorNode.value.clientHeight;
}, RESIZE_DEBOUNCE_TIME_MS, { leading: true, trailing: true, maxWait: RESIZE_DEBOUNCE_TIME_MS });

onBeforeUnmount(() => {
  observer.value?.disconnect();
})

const handleHueChange = (hue: number) => {
  colorHsb.hue = hue;

  model.value = outputColor.value;
  emits('change', outputColor.value);
};

const handleAlphaChange = (alpha: number) => {
  colorHsb.alpha = alpha;

  model.value = outputColor.value;
  emits('change', outputColor.value);
};

const handleDraggerMove = ({ x, y }: { x: number; y: number }) => {
  colorHsb.saturation = clamp(x / pickerSize.width, 0, 1);
  colorHsb.brightness = clamp(1 - (y / pickerSize.height), 0, 1);

  model.value = outputColor.value;
  emits('change', outputColor.value);
}

const handlePickerDrag = (e: MouseEvent) => {
  e.preventDefault();
}
</script>
