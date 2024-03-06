<template>
<div :style="styles">
  <InlineStack gap="400" align="center">
    <div style="color: var(--p-color-text-info-on-bg-fill)">
      <Text
        as="h2"
        variant="bodyMd"
        font-weight="regular"
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

interface Props {
  label: string;
  height?: string;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: 'auto',
  label: '',
});

const styles = computed(() => {
  return {
    background: 'var(--p-color-text-info)',
    padding: '14px var(--p-space-200)',
    height: props.height,
    width: props.width,
  }
});
</script>
