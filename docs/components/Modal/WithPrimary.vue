<template>
<Modal
  sectioned
  :open="active"
  :primary-action="primaryAction"
  @close="active = false"
>
  <template #activator>
    <Button
      @click="active = true"
    >
      Open
    </Button>
  </template>

  <template #title>
    Get a shareable link
  </template>

  <p>
    You can share this discount link with your customers via email or social media. Your discount will be automatically applied at checkout. 
  </p>
</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const active = ref(false);

const primaryAction = {
  content: 'Add Instagram',
  onAction: () => {
    // Do something
  },
};
</script>
