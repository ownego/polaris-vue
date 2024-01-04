<template>
<Button
  variant="plain"
  :disclosure="expanded ? 'up' : 'down'"
  @click="setExpanded"
>
  {{ expanded ? 'Show less' : 'Show more' }}
</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expanded = ref(false);

const setExpanded = () => {
  expanded.value = !expanded.value;
};
</script>
