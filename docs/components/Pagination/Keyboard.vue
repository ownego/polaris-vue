<template>
<div style="height: 100px">
  <Pagination
    hasPrevious
    :previousKeys="[74]"
    previousTooltip="j"
    hasNext
    :nextKeys="[75]"
    nextTooltip="k"
    @next="nextAction"
    @previous="previousAction"
  />
</div>
</template>

<script setup lang="ts">
const nextAction = () => {
  console.log('Next');
};
const previousAction = () => {
  console.log('Previous');
};
</script>
