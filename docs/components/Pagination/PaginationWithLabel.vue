<template>
<Pagination
  hasPrevious
  hasNext
  @previous="() => { console.log('Previous') }"
  @next="() => { console.log('Next') }"
>
  Results
</Pagination>
</template>
