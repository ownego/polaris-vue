<template>
<ChoiceList
  allowMultiple
  title="While the customer is checking out"
  :choices="choices"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(['shipping']);

const choices = [
  {
    label: 'Use the shipping address as the billing address by default',
    value: 'shipping',
    helpText:
      'Reduces the number of fields required to check out. The billing address can still be edited.',
  },
  {
    label: 'Require a confirmation step',
    value: 'confirmation',
    helpText:
      'Customers must review their order details before purchasing.',
  },
];
</script>
