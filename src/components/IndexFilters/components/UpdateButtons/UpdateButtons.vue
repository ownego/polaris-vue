<template lang="pug">
InlineStack(
  align="start",
  block-align="center",
  gap="100",
)
  Button(
    size="micro",
    variant="tertiary",
    :disabled="disabled",
    @click="cancelAction.onAction",
  ) {{ i18n.translate('Polaris.IndexFilters.UpdateButtons.cancel') }}
  template(v-if="primaryAction?.type === 'save-as'")
    Modal(
      :open="savedViewModalOpen",
      :primaryAction="primaryModalAction",
      :secondaryActions="secondaryModalActions",
    )
      template(#title) {{ i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.title') }}
      template(#activator)
        InlineStack
          Button(
            size="micro",
            :disabled="primaryModalAction.disabled || disabled",
            @click="handleClickSaveButton",
          ) {{ buttonText }}
      ModalSection
        Form(@submit="handlePrimaryAction")
          FormLayout
            div(ref="container")
              TextField(
                v-model="savedViewName",
                show-character-count,
                auto-complete="off",
                :disabled="disabled",
                :max-length="MAX_VIEW_NAME_LENGTH",
                :label="i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.label')",
                :error="hasSameNameError ? i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.sameName', {name: savedViewName}) : undefined",
                @change="handleChange",
              )
  Button(
    v-else,
    size="micro",
    :disabled="primaryAction?.loading || disabled",
    @click="handleClickSaveButton",
  ) {{ buttonText }}

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useI18n from '@/use/useI18n';
import { focusFirstFocusableNode } from '@/utilities/focus';
import { useIsTouchDevice } from '@/utilities/use-is-touch-device';
import type {
  IndexFiltersPrimaryAction,
  IndexFiltersCancelAction,
} from '../../types';
import {
  Modal,
  ModalSection,
  TextField,
  Form,
  FormLayout,
  InlineStack,
  Button,
} from '@/components';

interface UpdateIndexFiltersPrimaryAction
  extends Omit<IndexFiltersPrimaryAction, 'onAction'> {
  onAction: (value: string) => Promise<void>;
}

export interface UpdateButtonsProps {
  primaryAction?: UpdateIndexFiltersPrimaryAction;
  cancelAction: IndexFiltersCancelAction;
  viewNames: string[];
  disabled?: boolean;
}

const MAX_VIEW_NAME_LENGTH = 40;

const props = defineProps<UpdateButtonsProps>();

const i18n = useI18n();
const isTouchDevice = useIsTouchDevice();

const savedViewName = ref<string>('');
const savedViewModalOpen = ref<boolean>(false);
const container = ref<HTMLDivElement | null>(null);

const hasSameNameError = computed(() => props.viewNames.some(
  (name) => name.trim().toLowerCase() === savedViewName.value.trim().toLowerCase(),
));
const isPrimaryActionDisabled = computed(() => {
  return  hasSameNameError.value ||
    !savedViewName.value ||
    props.primaryAction?.loading ||
    savedViewName.value.length > MAX_VIEW_NAME_LENGTH;
});
const primaryModalAction = computed(() => {
  return {
    content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.save'),
    onAction: handlePrimaryAction,
    disabled: isPrimaryActionDisabled.value,
  };
});
const secondaryModalActions = computed(() => {
  return [
    {
      onAction: handleCloseModal,
      content: i18n.translate('Polaris.IndexFilters.UpdateButtons.modal.cancel'),
    },
  ];
});
const buttonText = computed(() => {
  switch (props.primaryAction?.type) {
    case 'save':
      return i18n.translate('Polaris.IndexFilters.UpdateButtons.save');
    case 'save-as':
    default:
      return i18n.translate('Polaris.IndexFilters.UpdateButtons.saveAs');
  }
});

async function handleClickSaveButton() {
  if (props.primaryAction?.type === 'save-as') {
    handleOpenModal();
  } else {
    await props.primaryAction?.onAction('');
  }
}

function handleOpenModal() {
  savedViewModalOpen.value = true;
}

function handleCloseModal() {
  savedViewModalOpen.value = false;
}

function handleChange(value: string) {
  savedViewName.value = value;
}

async function handlePrimaryAction() {
  if (isPrimaryActionDisabled.value) return;
  await props.primaryAction?.onAction(savedViewName.value);
  handleCloseModal();
}

watch(
  () => [savedViewModalOpen.value, isTouchDevice.value],
  () => {
    if (!container.value || isTouchDevice.value) return;
    if (savedViewModalOpen.value) {
      focusFirstFocusableNode(container.value);
    }
  },
  { immediate: true },
);
</script>
