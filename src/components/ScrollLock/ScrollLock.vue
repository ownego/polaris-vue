<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import useScrollLockManager from '@/use/useScrollLockManager';

const scrollLockManager = useScrollLockManager();

onMounted(() => {
  scrollLockManager.registerScrollLock();
});

onUnmounted(() => {
  scrollLockManager.unregisterScrollLock();
});
</script>

<style lang="scss">
@import '@polaris/components/ScrollLock/ScrollLock.module.scss';
</style>
