<template>
<div :style="style" ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  height?: string;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: 'auto',
});

const style = computed(() => {
  return {
    display: 'inherit',
    background: 'var(--p-color-text-info)',
    height: props.height,
    width: props.width,
  };
});
</script>
