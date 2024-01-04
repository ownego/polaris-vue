<template>
<ButtonGroup variant="segmented">
  <Button :pressed="isFirstButtonActive" @click="handleFirstButtonClick">
    First button
  </Button>
  <Button :pressed="!isFirstButtonActive" @click="handleSecondButtonClick">
    Second button
  </Button>
</ButtonGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isFirstButtonActive = ref(true);

const handleFirstButtonClick = () => {
  if (isFirstButtonActive.value) return;

  isFirstButtonActive.value = true;
};

const handleSecondButtonClick = () => {
  if (!isFirstButtonActive.value) return;

  isFirstButtonActive.value = false;
};
</script>
