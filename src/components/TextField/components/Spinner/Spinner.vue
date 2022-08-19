<template lang="pug">
div(
  ref="elRef",
  :aria-hidden="true",
  :class="styles.Spinner",
  @click="handleClick",
)
  div(
    role="button",
    tabindex="-1",
    :class="styles.Segment",
    @click="($event) => handleStep($event, 1)",
    @mousedown="$emit('mousedown')",
    @mouseup="$emit('mouseup')",
  )
    div(:class="styles.SpinnerIcon")
      Icon(:source="CaretUpMinor")
  div(
    role="button",
    tabindex="-1",
    :class="styles.Segment",
    @click="($event) => handleStep($event, -1)",
    @mousedown="$emit('mousedown')",
    @mouseup="$emit('mouseup')",
  )
    div(:class="styles.SpinnerIcon")
      Icon(:source="CaretDownMinor")
</template>

<script setup lang="ts">
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import CaretUpMinor from '@icons/CaretUpMinor.svg';
import styles from '@/classes/TextField.json';
import { Icon } from '@/components';
import { ref } from 'vue';

const emits = defineEmits<{
  (event: 'click', e: Event): void
  (event: 'change', value: number): void
  (event: 'mouseup'): void
  (event: 'mousedown'): void
}>();

const elRef = ref<HTMLDivElement | null>(null);

const handleClick = (e: Event) => {
  emits('click', e);
}

const handleStep = (event: Event, step: number): void => {
  emits('change', step);
};

defineExpose({ el: elRef })
</script>
