<template>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import useScrollLockManager from '@/use/useScrollLockManager';

const scrollLockManager = useScrollLockManager();

onMounted(() => {
  scrollLockManager.registerScrollLock();
});

onBeforeUnmount(() => {
  scrollLockManager.unregisterScrollLock();
});
</script>

<style lang="scss">
@import '@polaris/components/ScrollLock/ScrollLock.module.css';
</style>
