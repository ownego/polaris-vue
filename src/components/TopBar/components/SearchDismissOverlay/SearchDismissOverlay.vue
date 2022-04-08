<template lang="pug">
ScrollLock(v-if="visible")
div(
  v-bind="$attrs",
  ref="nodeRef",
  :class="className",
  @click="handleDismiss",
)
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ScrollLock } from '@/components';
import styles from '@/classes/TopBar-SearchDismissOverlay.json';
import { classNames } from 'polaris/polaris-react/src/utilities/css';

interface Props {
  /** Determines whether the overlay should be visible */
  visible: boolean;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: 'dismiss'): void;
}>();

const nodeRef = ref(null);

const className = computed(() => classNames(styles.SearchDismissOverlay, props.visible && styles.visible));

const handleDismiss = (e: Event) => {
  const target = e.target;
  if (target === nodeRef.value) {
    emits('dismiss');
  }
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TopBar/components/SearchDismissOverlay/SearchDismissOverlay.scss';
</style>
