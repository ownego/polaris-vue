<template lang="pug">
div(:class="styles.BulkActionButton", ref="bulkActionButton")
  Button(
    :external="external",
    :url="url",
    :aria-label="accessibilityLabel",
    :disabled="disabled",
    :disclosure="disclosure",
    @click="emits('action')",
  )
    | {{ content }}
  Indicator(v-if="indicator")
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { DisableableAction } from '@/utilities/interface';
import { Button, Indicator } from '@/components';
import styles from '@/classes/BulkActions.json';

interface BulkActionButtonProps {
  disclosure?: boolean;
  indicator?: boolean;
  url?: string;
  external?: boolean;
  content?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

const props = defineProps<BulkActionButtonProps>();
const emits = defineEmits<{
  (e: 'handle-measurement', width: number): void;
  (e: 'action'): void;
}>();

const bulkActionButton = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (bulkActionButton.value) {
    const width = bulkActionButton.value.getBoundingClientRect().width;
    emits('handle-measurement', width);
  }
})
</script>

