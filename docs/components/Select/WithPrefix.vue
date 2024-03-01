<template>
<Select
  label="Permission"
  :options="options"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';
import CaretDownIcon from '@icons/CaretDownIcon.svg';
import CaretUpIcon from '@icons/CaretUpIcon.svg';
/**
 * Use this snippet in your component instead:
 *
 * import { Icon } from '@ownego/polaris-vue';
 * import CaretDownIcon from '@shopify/polaris-icons/dist/svg/CaretDownIcon.svg';
 * import CaretUpIcon from '@shopify/polaris-icons/dist/svg/CaretUpIcon.svg
 */

const selected = ref('enabled');

const caretUp = h(resolveComponent('Icon'), { source: CaretUpIcon });
const caretDown = h(resolveComponent('Icon'), { source: CaretDownIcon });

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
