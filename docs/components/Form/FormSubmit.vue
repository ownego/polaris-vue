<template>
<Form @submit="handleSubmit">
  <FormLayout>
    <Checkbox
      label="Sign up for the Polaris newsletter"
      v-model="newsletter"
    />

    <TextField
      v-model="email"
      label="Email"
      type="email"
      autoComplete="email"
    >
      <template #helpText>
        <span>We'll use this email address to inform you on future changes to Polaris.</span>
      </template>
    </TextField>

    <Button type="submit">Submit</Button>
  </FormLayout>
</Form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newsletter = ref(false);
const email = ref('');

const handleSubmit = () => {
  newsletter.value = false;
  email.value = '';
};
</script>
