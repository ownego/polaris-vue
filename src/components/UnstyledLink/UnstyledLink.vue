<template lang="pug">
component(
  :is="to ? 'router-link' : 'a'",
  :href="url",
  :to="to",
  :target="to ? '_blank' : undefined",
  :rel="external ? 'noopener noreferrer' : undefined",
)
  <!-- Slot for displaying content inside the link -->
  slot
</template>

<script setup lang="ts">
interface Props {
  to?: string | Record<string, unknown>;
  url?: string;
  external?: boolean;
}

const props = defineProps<Props>();
</script>
