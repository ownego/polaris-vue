<template lang="pug">
router-link(
  v-if="to",
  :to="to",
)
  slot
a(
  v-else,
  :href="url",
  :target="to ? '_blank' : undefined",
  :download="download",
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
  download?: string | boolean;
}

defineProps<Props>();
</script>
