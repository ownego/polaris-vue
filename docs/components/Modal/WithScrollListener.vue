<template>
<Modal
  sectioned
  :open="active"
  @close="active = false"
  @scrolled-to-bottom="handleScrolledToBottom"
>
  <template #activator>
    <Button
      @click="active = true"
    >
      Open
    </Button>
  </template>

  <template #title>
    Scrollable content
  </template>

  <TextContainer>
    <p
      v-for="item in 50"
      :key="item"
    >
      Item <a href="#">#{{ item }}</a>
    </p> 
  </TextContainer>
</Modal>
</template>

<script setup lang="ts">
import { TextContainer } from '@/components';
import { ref } from 'vue';

const active = ref(false);

const handleScrolledToBottom = () => {
  alert('Scrolled to bottom!')
};
</script>


