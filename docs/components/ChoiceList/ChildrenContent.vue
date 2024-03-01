<template>
<ChoiceList
  title="Discount minimum requirements"
  :choices="choices"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';

const selected = ref(['none']);
const textFieldValue = ref('');

const children = h(resolveComponent('TextField'), {
  label: 'Minimum Quantity',
  labelHidden: true,
  modelValue: textFieldValue.value,
  autoComplete: 'off',
  'onUpdate:modelValue': (value: string) => {
    textFieldValue.value = value;
  },
});

const choices = [
  {label: 'None', value: 'none'},
  {label: 'Minimum purchase', value: 'minimum_purchase'},
  {
    label: 'Minimum quantity',
    value: 'minimum_quantity',
    renderChildren: children,
  },
];
</script>
