<template>
 <div style="width: 200px">
  <Button
    fullWidth
    textAlign="left"
    :disclosure="expanded ? 'up' : 'down'"
    @click="onClick"
  >
    {{ expanded ? 'Show less' : 'Show more' }}
  </Button>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expanded = ref(false);

const onClick = () => {
  expanded.value = !expanded.value;
};
</script>
