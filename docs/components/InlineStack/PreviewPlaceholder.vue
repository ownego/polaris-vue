<template>
<div
  :style="style"
>
</div>
</template>

<script setup lang="ts">
interface PlaceholderProps {
  height?: string;
  width?: string;
  label?: string;
  showBorder?: boolean;
}

const props = withDefaults(defineProps<PlaceholderProps>(), {
  height: 'auto',
  width: 'auto',
  label: '',
  showBorder: false,
});

const style = {
  background: 'var(--p-color-text-info)',
  height: props.height,
  width: props.width,
  borderInlineStart: props.showBorder
    ? '1px dashed var(--p-color-bg-surface-success)'
    : 'none',
};
</script>
