<template lang="pug">
VisuallyHidden(v-if="hidden")
  slot
slot(v-else)
</template>
<script setup lang="ts">
import { VisuallyHidden } from '@/components';

interface Props {
  hidden: boolean;
}

defineProps<Props>();
</script>
