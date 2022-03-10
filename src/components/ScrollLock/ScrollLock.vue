<script lang="ts">
export default {
  inheritAttrs: false,
  render() {
    return null;
  },
}
</script>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted } from 'vue';
import type { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';

const scrollLockManager = inject('scrollLockManager') as ScrollLockManager;

onMounted(() => {
  scrollLockManager.registerScrollLock();
});

onBeforeUnmount(() => {
  scrollLockManager.unregisterScrollLock();
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/ScrollLock/ScrollLock.scss';
</style>
