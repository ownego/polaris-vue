<template lang="pug">
button(
  :class="styles.CloseButton",
  aria-label="Close",
  @click="emit('click')",
)
  Icon(:source="MobileCancelMajor", color="base")
</template>

<script setup lang="ts">
import MobileCancelMajor from '@icons/MobileCancelMajor.svg';
import { Icon } from '@/components/Icon';
import styles from '@/classes/Modal-CloseButton.json';

const emit = defineEmits<{ (event: 'click'): void }>();
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Modal/components/CloseButton/CloseButton.scss';
</style>
