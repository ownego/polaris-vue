<template>
<Page fullWidth>
  <Card>
    <Grid
      :columns="{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }"
      :areas="areaGrid"
    >
      <GridCell area="product">
        <div
          :style="placeholderStyle"
        />
      </GridCell>
      <GridCell area="sales">
        <div
          :style="placeholderStyle"
        />
      </GridCell>
      <GridCell area="orders">
        <div
          :style="placeholderStyle"
        />
      </GridCell>
    </Grid>
  </Card>
</Page>
</template>

<script setup lang="ts">
const areaGrid = {
  xs: ['product', 'sales', 'orders'],
  sm: [
    'product product product product',
    'sales sales orders orders',
  ],
  md: ['sales product product orders'],
  lg: ['product product product product sales orders'],
  xl: ['product product sales sales orders orders'],
};

const placeholderStyle = {
  background: 'var(--p-color-text-info)',
  height: '60px',
  width: 'auto',
};
</script>
