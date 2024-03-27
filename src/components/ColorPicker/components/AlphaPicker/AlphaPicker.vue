<template lang="pug">
div(
  :class="styles.AlphaPicker",
  ref="alphaPickerRef",
)
  div(
    :class="styles.ColorLayer",
    :style="{ background }",
  )
  Slidable(
    :draggerY="draggerY",
    :draggerX="0",
    @change="handleChange",
    @dragger-height="setDraggerHeight",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { HSBColor } from '@polaris/utilities/color-types';
import { hsbToRgb } from '@/utilities/color-transformers';
import { Slidable } from '../Slidable';

import { calculateDraggerY, alphaForDraggerY } from '@polaris/components/ColorPicker/components/AlphaPicker/utilities';
import styles from '@polaris/components/ColorPicker/ColorPicker.module.css';

export type AlphaPickerProps = {
  color: HSBColor
  alpha: number;
}

type AlphaPickerEvents = {
  'change': [hue: number];
}

const props = defineProps<AlphaPickerProps>();
const emits = defineEmits<AlphaPickerEvents>();

const sliderHeight = ref(0);
const draggerHeight = ref(0);
const alphaPickerRef = ref<HTMLElement | null>(null);

const draggerY = computed(() => {
  return calculateDraggerY(props.alpha, sliderHeight.value, draggerHeight.value);
});

const background = computed(() => {
  return alphaGradientForColor(props.color);
});

onMounted(() => {
  setSliderHeight();
});

const setSliderHeight = () => {
  if (alphaPickerRef.value) {
    sliderHeight.value = alphaPickerRef.value.clientHeight;
  }
};

const setDraggerHeight = (height: number) => {
  draggerHeight.value = height;
};

const handleChange = ({ y }: { x: number; y: number }) => {
  const alpha = alphaForDraggerY(y, sliderHeight.value);
  emits('change', alpha);
};

function alphaGradientForColor(color: HSBColor) {
  const {red, green, blue} = hsbToRgb(color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
}
</script>
