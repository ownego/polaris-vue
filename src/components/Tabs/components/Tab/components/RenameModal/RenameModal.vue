<template lang="pug">
Modal(
  :instant="true",
  :open="open",
  :title="i18n.translate('Polaris.Tabs.RenameModal.title')",
  :primaryAction="primaryAction",
  :secondaryActions="secondaryActions",
  @close="emits('close')",
)
  ModalSection
    Form(@submit="handlePrimaryAction")
      FormLayout
        div(ref="container")
          TextField(
            v-model="model",
            autoComplete="off",
            :label="i18n.translate('Polaris.Tabs.RenameModal.label')",
            :helpText="helpText",
            :showCharacterCount="true",
            :error="errorMessage",
            @change="handleChange",
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

const props = defineProps<RenameModalProps>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'click-primary-action', value: string): Promise<boolean>;
  (e: 'click-secondary-action'): void;
}>();

const i18n = useI18n();
const model = defineModel<string>({
  default: '',
});
const container = ref<HTMLDivElement | null>(null);

const hasSameNameError = computed(() => props.viewNames
  ?.filter((viewName) => viewName !== props.name)
  .some(
    (viewName) =>
      viewName.trim().toLowerCase() === model.value.trim().toLowerCase(),
  ),
);

const isPrimaryActionDisabled = computed(() =>
  props.isModalLoading || hasSameNameError.value || model.value === props.name || !model.value,
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
);

watch(
  () => [props.name, props.open],
  () => {
    if (props.open) {
      model.value = props.name;
    }
  },
);

const handleChange = (newValue: string) => {
  model.value = newValue;
};

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
