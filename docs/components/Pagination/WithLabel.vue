<template>
<Pagination
  hasPrevious
  hasNext
  @next="nextAction"
  @previous="previousAction"
>
  Results
</Pagination>
</template>

<script setup lang="ts">
const nextAction = () => {
  console.log('Next');
};
const previousAction = () => {
  console.log('Previous');
};
</script>


