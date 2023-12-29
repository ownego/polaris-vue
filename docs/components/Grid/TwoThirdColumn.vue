<template>
 <Page full-width>
  <Grid :columns="{ sm: 3 }">
    <GridCell :column-span="{ xs: 6, sm: 4, md: 4, lg: 8, xl: 8 }">
      <LegacyCard title="Sales" sectioned>
        <p>View a summary of your online store’s sales.</p>
      </LegacyCard>
    </GridCell>
    <GridCell :column-span="{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }">
      <LegacyCard title="Orders" sectioned>
        <p>View a summary of your online store’s orders.</p>
      </LegacyCard>
    </GridCell>
  </Grid>
</Page>
</template>

<script setup lang="ts">
</script>
