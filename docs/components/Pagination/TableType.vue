<template>
<div
  :style="style"
>
  <Pagination
    type="table"
    hasNext
    @next="nextAction"
    @previous="previousAction"
  >
    1-50 of 8,450 orders
  </Pagination>
</div>
</template>

<script setup lang="ts">
const style = {
  maxWidth: '700px',
  margin: 'auto',
  border: '1px solid var(--p-color-border)'
};

const nextAction = () => {
  console.log('Next');
};

const previousAction = () => {
  console.log('Previous');
};
</script>
