<template lang="pug">
div(:class="styles.AdditionalMetaData")
  Text(variant="bodyMd", color="subdued", as="span")
    template(v-if="slots.default")
      slot
    template(v-else-if="additionalMetadata") {{ additionalMetadata }}
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import styles from '@/classes/Page-Header.json';
import { Text } from '@/components';

defineProps<{
  additionalMetadata?: string;
}>();

const slots = useSlots();
</script>
