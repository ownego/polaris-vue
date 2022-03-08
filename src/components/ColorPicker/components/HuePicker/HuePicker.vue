<template lang="pug">
div(
  :class="styles.HuePicker",
  ref="huePickerRef",
)
  Slidable(
    :draggerY="draggerY",
    :draggerX="0",
    @change="handleChange",
    @dragger-height="setDraggerHeight",
  )
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { calculateDraggerY, hueForDraggerY } from 'polaris-react/src/components/ColorPicker/components/HuePicker/utilities';
import styles from '@/classes/ColorPicker.json';
import { Slidable } from '../Slidable';

interface Props {
  hue: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'change', value: number): void
}>();

const huePickerRef = ref(null);
const sliderHeight = ref(0);
const draggerHeight = ref(0);

const draggerY = computed(() => {
  return calculateDraggerY(props.hue, sliderHeight.value, draggerHeight.value);
});

onMounted(() => {
  setSliderHeight();
});

const setSliderHeight = () => {
  if (huePickerRef.value) {
    sliderHeight.value = (huePickerRef.value as HTMLElement).clientHeight;
  }
}

const setDraggerHeight = (height: number) => {
  draggerHeight.value = height;
}

const handleChange = ({ y }: { y: number }) => {
  const hue = hueForDraggerY(y, sliderHeight.value);
  emit('change', hue);
}
</script>
