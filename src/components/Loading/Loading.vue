<template lang="pug">
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { UseFrame } from '@/utilities/frame';

const { useFrame } = UseFrame();
const {
  startLoading,
  stopLoading,
} = useFrame();

onMounted(() => {
  startLoading();
});

onBeforeUnmount(() => {
  stopLoading();
});
</script>
