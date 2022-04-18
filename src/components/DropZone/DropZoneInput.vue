<template lang="pug">
input(
  v-bind="props",
  ref="fileInputNode",
  autoComplete="off",
  @change="handleChange",
  @focus="handleFocus",
  @blur="handleBlur",
)
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';

type DropZoneFileType = 'file' | 'image';

interface DropZoneInputProps {
  id: string;
  accept?: string;
  disabled: boolean;
  type: DropZoneFileType;
  multiple: boolean;
  openFileDialog?: boolean;
}

const props = defineProps<DropZoneInputProps>();

const emits = defineEmits<{
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'input', event: Event): void;
  (e: 'file-dialog-close'): void;
}>();

const fileInputNode = ref<HTMLInputElement>();

onMounted(() => {
  props.openFileDialog && triggerFileDialog();
});

onUpdated(() => {
  props.openFileDialog && triggerFileDialog();
});

const triggerFileDialog = () => {
  open();
  emits('file-dialog-close');
};

const open = () => {
  if (!fileInputNode.value) {
    return;
  }

  fileInputNode.value.click();
};

const handleChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  if (!files) {
    return;
  }
  emits('input', event);
};

const handleFocus = () => {
  emits('focus');
};

const handleBlur = () => {
  emits('blur');
};
</script>
