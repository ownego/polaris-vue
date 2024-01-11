<template>
<TextField
  label="Weight"
  type="number"
  v-model="textFieldValue"
  autoComplete="off"
>
  <template #connectedLeft>
    <Select
      v-model="selectValue"
      label="Weight unit"
      label-hidden
      :options="['kg', 'lb']"
    />
  </template>
  <template #connectedRight>
    <Button>Submit</Button>
  </template>
</TextField>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textFieldValue = ref('10.6');
const selectValue = ref('kg');
</script>
