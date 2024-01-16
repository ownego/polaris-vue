<template>
<LegacyStack vertical>
  <RadioButton
    name="accounts"
    value="disabled"
    v-model="value"
    label="Accounts are disabled"
    helpText="Customers will only be able to check out as guests."
  />
  <RadioButton
    name="accounts"
    value="optional"
    v-model="value"
  >
    <template #label>Accounts are optional</template>
    <template #helpText>Customers will be able to check out with a customer account or as a guest.</template>
  </RadioButton>
</LegacyStack>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('disabled');
</script>
