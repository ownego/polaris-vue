<template lang="pug">
Modal(
  :open="open",
  :primaryAction="primaryAction",
  :secondaryActions="secondaryActions",
  @close="emits('close')",
)
  template(#title) {{ i18n.translate('Polaris.Tabs.RenameModal.title') }}
  ModalSection
    Form(@submit="handlePrimaryAction")
      FormLayout
        div(ref="container")
          TextField(
            v-model="model",
            autoComplete="off",
            :label="i18n.translate('Polaris.Tabs.RenameModal.label')",
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

export interface RenameModalProps {
  open: boolean;
  isModalLoading?: boolean;
  name: string;
  helpText?: string;
  viewNames?: string[];
}

const MAX_VIEW_NAME_LENGTH = 40;

const props = defineProps<RenameModalProps>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'click-primary-action', value: string): Promise<void>;
  (e: 'click-secondary-action'): void;
  (e: 'update:modelValue', value: string): void;
}>();

const i18n = useI18n();
const container = ref<HTMLDivElement | null>(null);
const modalValue = ref<string>('');

const model = computed({
  get() {
    return props.open ? props.name : '';
  },
  set(value: string) {
    modalValue.value = value;
    emits('update:modelValue', value);
  },
});

const hasSameNameError = computed(() => props.viewNames
  ?.filter((viewName) => viewName !== props.name)
  .some(
    (viewName) =>
      viewName.trim().toLowerCase() === modalValue.value.trim().toLowerCase(),
  ),
);

const isPrimaryActionDisabled = computed(() =>
  props.isModalLoading||
  hasSameNameError.value ||
  modalValue.value === props.name ||
  !modalValue.value ||
  modalValue.value.length > MAX_VIEW_NAME_LENGTH,
);

const primaryAction = computed(() => ({
  content: i18n.translate('Polaris.Tabs.RenameModal.create'),
  onAction: handlePrimaryAction,
  disabled: isPrimaryActionDisabled.value,
}));

const secondaryActions = computed(() => [
  {
    content: i18n.translate('Polaris.Tabs.RenameModal.cancel'),
    onAction: handleSecondaryAction,
  },
]);

const errorMessage = computed(() =>
  hasSameNameError.value
    ? i18n.translate(
      'Polaris.Tabs.RenameModal.errors.sameName',
      { name: modalValue.value },
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
);

const handlePrimaryAction = async () => {
  if (isPrimaryActionDisabled.value) {
    return;
  }

  await emits('click-primary-action', modalValue.value);
  model.value = '';
  emits('close');
}

const handleSecondaryAction = () => {
  emits('click-secondary-action');
  model.value = props.name;
  emits('close');
}
</script>
