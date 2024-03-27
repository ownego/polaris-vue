<template lang="pug">
div(
  ref="huePickerRef",
  :class="styles.HuePicker",
)
  Slidable(
    :dragger-y="draggerY",
    :dragger-x="0",
    @change="handleChange",
    @dragger-height="setDraggerHeight",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { calculateDraggerY, hueForDraggerY } from '@polaris/components/ColorPicker/components/HuePicker/utilities';
import styles from '@polaris/components/ColorPicker/ColorPicker.module.css';
import { Slidable } from '../Slidable';

type HuePickerProps = {
  hue: number;
}

type HuePickerEvents = {
  'change': [hue: number];
}

const props = defineProps<HuePickerProps>();
const emits = defineEmits<HuePickerEvents>();

const sliderHeight = ref(0);
const draggerHeight = ref(0);
const huePickerRef = ref<HTMLElement | null>(null);

const draggerY = computed(() => {
  return calculateDraggerY(props.hue, sliderHeight.value, draggerHeight.value);
});

onMounted(() => {
  setSliderHeight();
});

const setSliderHeight = () => {
  if (!huePickerRef.value) {
    return;
  }

  sliderHeight.value = huePickerRef.value.clientHeight;
};

const setDraggerHeight = (height: number) => {
  draggerHeight.value = height;
};

const handleChange = ({ y }: {y: number}) => {
  const hue = hueForDraggerY(y, sliderHeight.value);
  emits('change', hue);
};
</script>
