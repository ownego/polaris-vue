<template>
<Pagination
  hasPrevious
  hasNext
  @previous="() => { console.log('Previous') }"
  @next="() => { console.log('Next') }"
/>
</template>
