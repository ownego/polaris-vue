<template>
<Card>
  <Text as="h2" variant="bodyMd">
    Content inside a card
  </Text>
  <Bleed margin-inline="400">
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
            marginInline
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
  padding: '14px var(--p-space-200)',
  height: 'auto',
  width: 'auto',
}
</script>
