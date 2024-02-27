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
    Discard all unsaved changes
  </template>

  <p>
    If you discard changes, you’ll delete any edits you made since you last saved.
  </p>
</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const active = ref(false);

const primaryAction = {
  content: 'Discard changes',
  onAction: () => {
    // Do something
  },
  destructive: true,
};

const secondaryActions = [
  {
    content: 'Continue editing',
    onAction: () => {
      // Do something
    },
  },
];
</script>

