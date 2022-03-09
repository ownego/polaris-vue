<template lang="pug">
div(
  :class="styles.AlphaPicker",
  ref="alphaPickerRef",
)
  div(
    :class="styles.ColorLayer",
    :style="{ background }",
  ) &nbsp;
  Slidable(
    :draggerY="draggerY",
    :draggerX="0",
    @change="handleChange",
    @dragger-height="setDraggerHeight",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import type { HSBColor } from 'polaris-react/src/utilities/color-types';
import { calculateDraggerY, alphaForDraggerY } from 'polaris-react/src/components/ColorPicker/components/AlphaPicker/utilities';
import { hsbToRgb } from '@/utilities/color-transformers';
import styles from '@/classes/ColorPicker.json';
import { Slidable } from '../Slidable';

interface Props {
  color: HSBColor;
  alpha: number;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'change', value: number): void
}>();

const alphaPickerRef = ref(null);
const sliderHeight = ref(0);
const draggerHeight = ref(0);

const draggerY = computed(() => {
  return calculateDraggerY(props.alpha, sliderHeight.value, draggerHeight.value);
});

const background = computed(() => {
  const { red, green, blue } = hsbToRgb(props.color);
  const rgb = `${red}, ${green}, ${blue}`;
  return `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
});

onMounted(() => {
  setSliderHeight();
})

const setSliderHeight = () => {
  if (alphaPickerRef.value) {
    sliderHeight.value = (alphaPickerRef.value as HTMLElement).clientHeight;
  }
}

const setDraggerHeight = (height: number) => {
  draggerHeight.value = height;
}

const handleChange = ({ y }: { y: number }) => {
  const alpha = alphaForDraggerY(y, sliderHeight.value);
  emits('change', alpha);
}
</script>
