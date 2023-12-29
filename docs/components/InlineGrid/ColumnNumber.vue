<template>
<InlineGrid :columns="2">
  <Placeholder height="320px" />
  <Placeholder height="320px" showBorder />
</InlineGrid>
</template>

<script setup lang="ts">
import Placeholder from './PreviewPlaceholder.vue';
</script>
