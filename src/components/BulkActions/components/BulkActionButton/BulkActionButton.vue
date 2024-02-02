<template lang="pug">
div(:class="styles.BulkActionButton", ref="bulkActionButton")
  template(v-if="isActivatorForMoreActionsPopover")
    Tooltip(
      preferred-position="above",
      :content="content",
    )
      Button(
        size="slim",
        :external="external",
        :url="url",
        :accessibility-label="isActivatorForMoreActionsPopover ? content : accessibilityLabel",
        :disabled="disabled",
        :icon="isActivatorForMoreActionsPopover ? MenuHorizontalIcon : undefined",
        @click="emits('action')",
      ) {{ buttonContent }}
  Button(
    v-else,
    size="slim",
    :external="external",
    :url="url",
    :accessibility-label="isActivatorForMoreActionsPopover ? content : accessibilityLabel",
    :disabled="disabled",
    :icon="isActivatorForMoreActionsPopover ? MenuHorizontalIcon : undefined",
    @click="emits('action')",
  ) {{ buttonContent }}
  Indicator(v-if="indicator")
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import {
  Button,
  Indicator,
  Tooltip,
} from '@/components';
import type { DisableableAction } from '@/utilities/types';
import MenuHorizontalIcon from '@icons/MenuHorizontalIcon.svg';
import styles from '@polaris/components/BulkActions/BulkActions.module.scss';


export type BulkActionButtonProps = {
  disclosure?: boolean;
  indicator?: boolean;
  handleMeasurement?(width: number): void;
  showContentInButton?: boolean;
} & DisableableAction;

const props = defineProps<BulkActionButtonProps>();
const emits = defineEmits<{
  'handle-measurement': [width: number],
  'action': [],
}>();

const bulkActionButton = ref<HTMLButtonElement | null>(null);

const isActivatorForMoreActionsPopover = computed(() => {
  return props.disclosure && !props.showContentInButton;
});
const buttonContent = computed(() => isActivatorForMoreActionsPopover.value ? undefined : props.content);

onMounted(() => {
  if (bulkActionButton.value) {
    const width = bulkActionButton.value.getBoundingClientRect().width;
    emits('handle-measurement', width);
  }
});
</script>