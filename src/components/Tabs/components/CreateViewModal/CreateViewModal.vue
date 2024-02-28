<template lang="pug">
Modal(
  :open="open",
  :primaryAction="primaryAction",
  :secondaryActions="secondaryActions",
  @close="emits('close')",
)
  template(#title) {{ i18n.translate('Polaris.Tabs.CreateViewModal.title') }}
  template(#activator)
    slot
  ModalSection
    Form(@submit="handlePrimaryAction")
      FormLayout
        div(ref="container")
          TextField(
            autoComplete="off",
            v-model="model",
            :label="i18n.translate('Polaris.Tabs.CreateViewModal.label')",
            :maxLength="MAX_VIEW_NAME_LENGTH",
            :showCharacterCount="true",
            :error="errorMessage",
            @change="handleChange",
          )
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { ComplexAction, VueNode } from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { useIsTouchDevice } from '@/utilities/use-is-touch-device';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { Modal, Form, ModalSection, FormLayout, TextField } from '@/components';

export interface CreateViewModalProps {
  open: boolean;
  viewNames: string[];
}

const MAX_VIEW_NAME_LENGTH = 40;

const props = defineProps<CreateViewModalProps>();

const slots = defineSlots<{
  /** activator to display in tabs */
  default?: (_?: VueNode) => any[];
}>();

const emits = defineEmits<{
  (e: 'close'): void;
  (e: 'click-primary-action', value: string): Promise<boolean>;
  (e: 'click-secondary-action'): void;
}>();

const i18n = useI18n();
const isTouchDevice = useIsTouchDevice();

const model = defineModel<string>({
  default: '',
});
const loading = ref<boolean>(false);
const container = ref<HTMLDivElement | null>(null);

const hasSameNameError = computed(() => props.viewNames.some(
  (viewName) => viewName.trim().toLowerCase() === model.value.trim().toLowerCase(),
));

const isPrimaryActionDisabled = computed(() =>
  !model.value ||
  hasSameNameError.value ||
  loading.value ||
  model.value.length > MAX_VIEW_NAME_LENGTH,
);

const primaryAction = computed(() => {
  return {
    content: i18n.translate('Polaris.Tabs.CreateViewModal.create'),
    disabled: isPrimaryActionDisabled.value,
    onAction: handlePrimaryAction,
  } as unknown as ComplexAction;
});

const secondaryActions = computed(() => [
  {
    content: i18n.translate('Polaris.Tabs.CreateViewModal.cancel'),
    onAction: handleSecondaryAction,
  },
]);

const errorMessage = computed(() => hasSameNameError.value
  && i18n.translate('Polaris.Tabs.CreateViewModal.errors.sameName', { name: model.value }),
);

const handleChange = (newValue: string) => {
  model.value = newValue;
};

const handlePrimaryAction = async () => {
  if (hasSameNameError.value || isPrimaryActionDisabled.value) {
    return;
  }

  loading.value = true;
  await emits('click-primary-action', model.value);
  loading.value = false;
  model.value = '';
  emits('close');
}
const handleSecondaryAction = () => {
  emits('click-secondary-action');
  model.value = '';
  emits('close');
}

watch(
  () => [props.open, isTouchDevice.value],
  () => {
    if (!container.value || isTouchDevice.value) return;

    if (props.open) {
      focusFirstFocusableNode(container.value);
      const timeout = setTimeout(() => {
        if (!container.value) return;

        focusFirstFocusableNode(container.value);
      }, 50);

      return () => clearTimeout(timeout);
    }
  },
);
</script>
