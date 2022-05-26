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
import { Modal } from '@/components';
import { UseI18n } from '@/use';

interface DiscardConfirmationModalProps {
  open: boolean;
}

defineProps<DiscardConfirmationModalProps>();

const emits = defineEmits<{
  (e: 'discard'): void;
  (e: 'cancel'): void;
}>();

const i18n = UseI18n();

const message = i18n.translate('Polaris.DiscardConfirmationModal.message');
const title = i18n.translate('Polaris.DiscardConfirmationModal.title');
const primaryActionMsg = i18n.translate('Polaris.DiscardConfirmationModal.primaryAction');
const secondaryActionMsg = i18n.translate('Polaris.DiscardConfirmationModal.secondaryAction');

const onDiscard = () => {
  emits('discard');
};

const onCancel = () => {
  emits('cancel');
};
</script>
