<template>
<Select
  label="Permission"
  :options="options"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { Icon } from '@/components';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import CaretUpMinor from '@icons/CaretUpMinor.svg';
/**
 * Use this snippet in your component instead:
 *
 * import { Icon } from '@ownego/polaris-vue';
 * import CaretDownMinor from '@shopify/polaris-icons/dist/svg/CaretDownMinor.svg';
 * import CaretUpMinor from '@shopify/polaris-icons/dist/svg/CaretUpMinor.svg
 */

const selected = ref('enabled');

const caretUp = h(Icon, { source: CaretUpMinor });
const caretDown = h(Icon, { source: CaretDownMinor });

const options = [
  {
    label: 'Increase',
    value: 'Increase',
    prefix: caretUp,
  },
  {
    label: 'Decrease',
    value: 'Decrease',
    prefix: caretDown,
  },
];
</script>
