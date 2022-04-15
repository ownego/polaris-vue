<template lang="pug">
kbd(:class="styles.KeyboardKey") {{ keyString }}
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import styles from '@/classes/KeyboardKey.json';

const slots = useSlots();

const keyString = computed(() => {
  const slotText = slots.default && slots.default()[0].children
    ? slots.default()[0].children
    : '';

  if (typeof slotText === 'string') {
    return  slotText.length > 1
      ? slotText.toLowerCase()
      : slotText.toUpperCase();
  }

  return slotText;
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/KeyboardKey/KeyboardKey.scss';
</style>
