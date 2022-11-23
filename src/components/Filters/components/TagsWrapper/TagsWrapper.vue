<template lang="pug">
Text(v-if="hidden", variant="bodySm", as="span", visually-hidden)
  slot
slot(v-else)
</template>
<script setup lang="ts">
import { Text } from '@/components';

interface Props {
  hidden: boolean;
}

defineProps<Props>();
</script>
