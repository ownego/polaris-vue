<template>
 <LegacyCard sectioned>
  <EmptyState
    heading="Manage your inventory transfers"
    :action="{ content: 'Add transfer' }"
    :secondary-action="{ content: 'Learn more', url: 'https://help.shopify.com' }"
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Track and receive your incoming inventory from suppliers.</p>
    <template #footerContent>
      <p>
        If you don’t want to add a transfer, you can import your inventory
        from
        <Link monochrome url="/settings">
          settings
        </Link>
        .
      </p>
    </template>
  </EmptyState>
</LegacyCard>
</template>

<script setup lang="ts">
</script>
