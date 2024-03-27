<template lang="pug">
ScrollLock
div(
  :class="className",
  @click="emits('click')",
  @touchstart="emits('touch-start')",
  @mousedown="handleMouseDown",
  @mouseup="handleMouseUp",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ScrollLock } from '@/components';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Backdrop/Backdrop.module.css';

interface BackdropProps {
  belowNavigation?: boolean;
  transparent?: boolean;
}

const props = defineProps<BackdropProps>();

const emits = defineEmits<{
  'click': [];
  'touch-start': [],
  'closing': [value: boolean]
}>();

const className = computed(() => {
  return classNames(
    styles.Backdrop,
    props.belowNavigation && styles.belowNavigation,
    props.transparent && styles.transparent,
  );
});

const handleMouseDown = () => {
  emits('closing', true);
};

const handleMouseUp = () => {
  emits('closing', false);
  emits('click');
};
</script>
