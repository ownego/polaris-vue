<template>
<Card>
  <Bleed marginBlock="800">
    <div
      :style="placeHolderStyle"
    >
      <InlineStack gap="400" align="center">
        <div
          style="color: var(--p-color-text-info-on-bg-fill)"
        >
          <Text
            as="h2"
            variant="bodyMd"
            font-weight="regular"
            tone="text-inverse"
          >
            marginBlock
          </Text>
        </div>
      </InlineStack>
    </div>
  </Bleed>
</Card>
</template>

<script setup lang="ts">
const placeHolderStyle = {
  background: 'var(--p-color-text-info)',
  padding: 'var(--p-space-1000) var(--p-space-200)',
  height: 'auto',
  width: 'auto',
};
</script>
