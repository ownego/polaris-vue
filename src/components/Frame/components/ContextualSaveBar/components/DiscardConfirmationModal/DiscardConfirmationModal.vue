<template lang="pug">
Modal(
  :open="open",
  @close="onCancel",
  :primaryAction="{content: primaryActionMsg, destructive: true, onAction: onDiscard}",
  :secondaryActions="[{content: secondaryActionMsg, onAction: onCancel}]",
  sectioned,
)
  template(#title) {{ title }}
  template(#content) {{ message }}
</template>
<script setup lang="ts">
import lang from 'polaris-react/locales/en.json';
import { Modal } from '@/components';

interface DiscardConfirmationModalProps {
  open: boolean;
}

const props = defineProps<DiscardConfirmationModalProps>();

const emits = defineEmits<{
  (e: 'discard'): void;
  (e: 'cancel'): void;
}>();

const message = lang.Polaris.DiscardConfirmationModal.message;
const title = lang.Polaris.DiscardConfirmationModal.title;
const primaryActionMsg = lang.Polaris.DiscardConfirmationModal.primaryAction;
const secondaryActionMsg = lang.Polaris.DiscardConfirmationModal.secondaryAction;

const onDiscard = () => {
  emits('discard');
};

const onCancel = () => {
  emits('cancel');
};
</script>
