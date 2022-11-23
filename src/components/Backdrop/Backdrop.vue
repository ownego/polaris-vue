<template lang="pug">
ScrollLock
div(
  :class="className",
  @click="emits('click')",
  @touchstart="emits('touchstart')",
  @mousedown="handleMouseDown",
  @mouseup="handleMouseUp",
)
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/Backdrop.json';
import { ScrollLock } from '@/components';

interface Props {
  belowNavigation?: boolean;
  transparent?: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'click'): void;
  (event: 'touchstart'): void;
  (event: 'closing', value: boolean): void;
  (event: 'closed'): void;
}>();

const isClosing = ref(false);

const className = computed(() => {
  return classNames(
    styles.Backdrop,
    props.belowNavigation && styles.belowNavigation,
    props.transparent && styles.transparent,
  );
});

const handleMouseDown = () => {
  isClosing.value = true;
  emits('closing', true);
};

const handleMouseUp = () => {
  isClosing.value = false;
  emits('closing', false);
  emits('click');
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Backdrop/Backdrop.scss';
</style>
