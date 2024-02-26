<template>
<Modal
  sectioned
  :open="active"
  :primary-action="primaryAction"
  :secondary-actions="secondaryActions"
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
    Reach more shoppers with Instagram product tags
  </template>

  <p>
    Use Instagram posts to share your products with millions of people. Let shoppers buy from your store without leaving Instagram.
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

const secondaryActions = [
  {
    content: 'Learn more',
    onAction: () => {
      // Do something
    },
  },
];
</script>
