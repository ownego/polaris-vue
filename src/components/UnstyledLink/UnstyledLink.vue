<template lang="pug">
// Router link
router-link(
  v-if="to",
  :to="to",
)
  slot


// Just a link
a(
  v-else,
  :href="url",
  :target="targetProperty",
  :rel="relProperty",
)
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  to?: string | Record<string, unknown>;
  url?: string;
  external?: boolean;
  target?: string;
}

const props = defineProps<Props>();

const targetProperty = computed(() => {
  if (props.external) {
    return '_blank';
  }

  return props.target ?? undefined;
});

const relProperty = computed(() => {
  return targetProperty.value === '_blank' ? 'noopener noreferrer' : undefined;
})
</script>
