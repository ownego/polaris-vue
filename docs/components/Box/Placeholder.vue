<template>
<div
  :style="{ background: 'var(--p-color-text-info)', height: height, width: width, }"
>
  <InlineStack gap="400" :align="childAlign">
    <div
      style="{ color: 'var(--p-color-text-info-on-bg-fill)' }">
      <Text
        as="h2"
        variant="bodyMd"
        fontWeight="medium"
        tone="text-inverse"
      >
        {{ label }}
      </Text>
    </div>
  </InlineStack>
</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  height?: string;
  width?: string;
  childAlign: 'start' | 'center' | 'end';
}>(), {
  height: 'auto',
  width: 'auto',
  label: '',
});
</script>
