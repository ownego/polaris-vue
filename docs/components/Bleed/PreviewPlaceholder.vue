<template>
<div
  style={{
    background: 'var(--p-color-text-info)',
    padding: '14px var(--p-space-200)',
    height: height,
    width: width,
  }}
>
  <InlineStack gap="400" align="center">
    <div
      style={{
        color: 'var(--p-color-text-info-on-bg-fill)',
      }}
    >
      <Text
        as="h2"
        variant="bodyMd"
        fontWeight="regular"
        tone="text-inverse"
      >
        {label}
      </Text>
    </div>
  </InlineStack>
</div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  height?: string;
  width?: string;
}

const props = withDefaults()
</script>
