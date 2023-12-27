<template>
<InlineGrid :columns="['oneThird', 'twoThirds']">
  <Placeholder height="320px" label="oneThird" />
  <Placeholder height="320px" label="twoThirds" show-border />
</InlineGrid>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
