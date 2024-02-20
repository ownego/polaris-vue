<template>
<Pagination
  hasPrevious
  hasNext
  previousTooltip="j"
  nextTooltip="k"
  :previousKeys="[74]"
  :nextKeys="[75]"
  @previous="() => { console.log('Previous') }"
  @next="() => { console.log('Next') }"
/>
</template>
