<template lang="pug">
Modal(
  :open="open",
  :primaryAction="primaryAction",
  :secondaryActions="secondaryActions",
  @close="emits('close')",
)
  template(#title) {{ i18n.translate('Polaris.Tabs.DuplicateModal.title') }}
  ModalSection
    Form(@submit="handlePrimaryAction")
      FormLayout
        div(ref="container")
          TextField(
            v-model="model",
            autoComplete="off",
            :label="i18n.translate('Polaris.Tabs.DuplicateModal.label')",
            :helpText="helpText",
            :maxLength="MAX_VIEW_NAME_LENGTH",
            :showCharacterCount="true",
            :error="errorMessage",
          )
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import useI18n from '@/use/useI18n';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { Modal, Form, ModalSection, FormLayout, TextField } from '@/components';

export interface DuplicateModalProps {
  open: boolean;
  isModalLoading?: boolean;
  name: string;
  helpText?: string;
  viewNames?: string[];
}

const MAX_VIEW_NAME_LENGTH = 40;

const props = defineProps<DuplicateModalProps>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'click-primary-action', value: string): Promise<void>;
  (e: 'click-secondary-action'): void;
}>();

const i18n = useI18n();
const container = ref<HTMLDivElement | null>(null);

const model = computed(() => props.open ? props.name.slice(0, MAX_VIEW_NAME_LENGTH) : '');

const hasSameNameError = computed(() => props.viewNames?.some(
  (viewName) => viewName.trim().toLowerCase() === model.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() => {
  return props.isModalLoading ||
    hasSameNameError.value ||
    !model.value ||
    model.value.length > MAX_VIEW_NAME_LENGTH;
});

const primaryAction = computed(() => ({
  content: i18n.translate('Polaris.Tabs.DuplicateModal.create'),
  onAction: handlePrimaryAction,
  disabled: isPrimaryActionDisabled.value,
}));

const secondaryActions = computed(() => [
  {
    content: i18n.translate('Polaris.Tabs.DuplicateModal.cancel'),
    onAction: handleSecondaryAction,
  },
]);

const errorMessage = computed(() =>
  hasSameNameError.value
    ? i18n.translate(
      'Polaris.Tabs.DuplicateModal.errors.sameName',
      { name: model.value },
    )
    : undefined,
);

watch(
  () => props.open,
  (newVal) => {
    if (!container.value)
      return;

    if (newVal) {
      focusFirstFocusableNode(container.value);
    }
  },
  {
    flush: 'post',
  },
);

const handlePrimaryAction = async () => {
  if (isPrimaryActionDisabled.value) {
    return;
  }

  await emits('click-primary-action', model.value);
  model.value = '';
  emits('close');
}

const handleSecondaryAction = () => {
  emits('click-secondary-action');
  model.value = props.name;
  emits('close');
}
</script>
