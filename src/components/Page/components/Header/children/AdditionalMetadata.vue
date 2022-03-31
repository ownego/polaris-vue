<template lang="pug">
div(:class="styles.AdditionalMetaData")
  TextStyle(variation="subdued")
    template(v-if="slots.default")
      slot
    template(v-else-if="additionalMetadata") {{ additionalMetadata }}
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import styles from '@/classes/Page-Header.json';
import { TextStyle } from '@/components/TextStyle';

defineProps<{
  additionalMetadata?: string;
}>();

const slots = useSlots();
</script>
