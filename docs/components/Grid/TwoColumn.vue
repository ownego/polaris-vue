<template>
<Page fullWidth>
  <Grid>
    <GridCell :column-span="{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }">
      <LegacyCard title="Sales" sectioned>
        <p>View a summary of your online store’s sales.</p>
      </LegacyCard>
    </GridCell>
    <GridCell :column-span="{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }">
      <LegacyCard title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </LegacyCard>
    </GridCell>
  </Grid>
</Page>
</template>

<script setup lang="ts">
</script>
