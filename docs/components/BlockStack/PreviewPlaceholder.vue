<template>
<div :style="wrapperStyle">
  <InlineStack align="center">
    <div style="color: var(--p-color-text-info-on-bg-fill)">
      <Text
        as="h2"
        variant="bodyMd"
        fontWeight="regular"
        tone="text-inverse"
      >
        {{ label }}
      </Text>
    </div>
  </InlineStack>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const wrapperStyle = computed(() => {
  return {
    background: 'var(--p-color-text-info)',
    padding: '14px var(--p-space-200)',
    height: props.height,
    width: props.width,
    borderBlockEnd: props.showBorder
      ? '1px dashed var(--p-color-bg-surface-success)'
      : 'none',
  }
});
</script>
