<template>
<Form noValidate @submit="handleSubmit">
  <FormLayout>
    <TextField
      v-model="url"
      label="App URL"
      type="url"
      autoComplete="off"
    />

    <Button type="submit">Submit</Button>
  </FormLayout>
</Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const url = ref('');

const handleSubmit = () => {
  url.value = '';
};
</script>
