<template>
<ButtonGroup variant="segmented">
  <Button
    :pressed="activeButtonIndex === 0"
    @click="() => handleButtonClick(0)"
  >
    Bold
  </Button>
  <Button
    :pressed="activeButtonIndex === 1"
    @click="() => handleButtonClick(1)"
  >
    Italic
  </Button>
  <Button
    :pressed="activeButtonIndex === 2"
    @click="() => handleButtonClick(2)"
  >
    Underline
  </Button>
</ButtonGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeButtonIndex = ref<number>(0);

const handleButtonClick = (index: number) => {
  if (activeButtonIndex.value === index) {
    return;
  }

  activeButtonIndex.value = index;
};
</script>

