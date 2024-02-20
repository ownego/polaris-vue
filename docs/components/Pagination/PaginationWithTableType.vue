<template>
  <div :style="{
    maxWidth: '700px',
    margin: 'auto',
    border: '1px solid var(--p-color-border)'
  }">
    <Pagination
      type="table" hasNext
      @previous="() => { console.log('Previous') }"
      @next="() => { console.log('Next') }"
    >
      1-50 of 8,450 orders
    </Pagination>
  </div>
</template>
