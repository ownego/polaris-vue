<template>
<div :style="style" >
  <InlineStack gap="400" align="center" block-align="center">
    <div
      :style="inlineDivStyle"
    >
      <Text
        as="h2"
        variant="bodyMd"
        fontWeight="medium"
        alignment="center"
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
  height?: string;
  width?: string;
  label?: string;
  showBorder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  width: 'auto',
  label: '',
  showBorder: false,
});

const style = computed(() => {
  return {
    display: 'inherit',
    background: 'var(--p-color-text-info)',
    height: props.height || undefined,
    width: props.width || undefined,
    borderInlineStart: props.showBorder
      ? '1px dashed var(--p-color-bg-surface-success)'
      : 'none',
  };
});

const inlineDivStyle = computed(() => {
  return {
    color: 'var(--p-color-text-info-on-bg-fill)',
    width: props.width || undefined,
  };
});
</script>
