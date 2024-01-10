<template>
<FormLayout>
  <ChoiceList
    title="Gift card auto-expiration"
    :choices="choices"
    :selected="selected"
    @change="handleChoiceChange"
  />
  <TextField
    label="Gift cards expire after"
    type="number"
    label-hidden
    v-model="value"
    :disabled="selected === 'no'"
    autoComplete="off"
  >
    <template #connectedRight>
      <Select
        label="Unit of time"
        label-hidden
        :options="options"
      />
    </template>
  </TextField>
</FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const choices = [
  {label: 'Gift cards never expire', value: 'no'},
  {label: 'Gift cards expire', value: 'yes'},
];

const options = ['months after purchase'];

const value = ref('12');
const selected = ref('yes');

const handleChoiceChange = (selections: string[]) => {
  selected.value = selections[0];
}
</script>
