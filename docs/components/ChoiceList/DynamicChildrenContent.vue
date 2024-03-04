<template>
<div :style="{height: '150px'}">
  <ChoiceList
    title="Discount minimum requirements"
    :choices="choices"
    v-model="selected"
  />
</div>
</template>

<script setup lang="ts">
import { computed, h, ref, resolveComponent } from 'vue';

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

const choices = computed(() => ([
  {label: 'None', value: 'none'},
  {label: 'Minimum purchase', value: 'minimum_purchase'},
  {
    label: 'Minimum quantity',
    value: 'minimum_quantity',
    renderChildren: selected.value.includes('minimum_quantity') && children,
  },
]));
</script>
