<template lang="pug">
.docs-dodont
  slot
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';

const slots = useSlots();

console.log(slots.default);
</script>
