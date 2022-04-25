<template lang="pug">
Labelled(
  :id="uniqueId",
  :action="labelAction",
  :labelHidden="labelHiddenValue",
)
  template(#label)
    slot(name="label", v-if="slots.label")
    template(v-else-if="label") {{ label }}
    template(v-else) {{ labelFallback }}
  div(
    ref="dropZoneRef",
    :class="classes",
    :aria-disabled="disabled",
    @click="handleClick",
    @dragstart="stopEvent",
  )
    div(
      v-if="showDragOverlay",
      :class="styles.Overlay",
    )
      Stack(
        vertical,
        spacing="tight",
      )
        Icon(
          v-if="size === 'small'",
          :source="UploadMajor",
          color="interactive",
        )
        Caption(v-else)
          TextStyle(variation="strong") {{ overlayTextWithDefault }}
    div(
      v-if="showDragErrorOverlay",
      :class="styles.Overlay",
    )
      Stack(
        vertical,
        spacing="tight",
      )
        Icon(
          v-if="size === 'small'",
          :source="CircleAlertMajor",
          color="critical",
        )
        Caption(v-else)
          TextStyle(variation="strong") {{ errorOverlayTextWithDefault }}
    VisuallyHidden
      DropZoneInput(
        type="file",
        :id="uniqueId",
        :accept="accept",
        :disabled="disabled",
        :multiple="allowMultiple || false",
        :openFileDialog="openFileDialog",
        @input="handleDrop",
        @focus="handleFocus",
        @blur="handleBlur",
        @file-dialog-close="onFileDialogClose",
      )
    div(:class="styles.Container")
      slot
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, reactive, ref, useAttrs, useSlots } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import UploadMajor from '@icons/UploadMajor.svg';
import CircleAlertMajor from '@icons/CircleAlertMajor.svg';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { capitalize } from 'polaris/polaris-react/src/utilities/capitalize';
import { isServer } from 'polaris/polaris-react/src/utilities/target';
import {
  Stack,
  Caption,
  TextStyle,
  VisuallyHidden,
  Labelled,
  Icon,
} from '@/components';
import type { LabelledProps } from '@/components/Labelled/utils';
import { UseUniqueId } from '@/use';
import styles from '@/classes/DropZone.json';

import { default as DropZoneInput } from './DropZoneInput.vue';
import {
  fileAccepted,
  getDataTransferFiles,
  defaultAllowMultiple,
  createAllowMultipleKey,
} from './utils';

type DropZoneFileType = 'file' | 'image' | 'video';

interface DropZoneProps {
  /** Label for the file input */
  label?: string;
  /** Adds an action to the label */
  labelAction?: LabelledProps['action'];
  /** Visually hide the label */
  labelHidden?: boolean;
  /** ID for file input */
  id?: string;
  /** Allowed file types */
  accept?: string;
  /**
   * Whether is a file or an image
   * @default 'file'
   */
  type?: DropZoneFileType;
  /** Sets an active state */
  active?: boolean;
  /** Sets an error state */
  error?: boolean;
  /**
   * Displays an outline border
   * @default true
   */
  outline?: boolean;
  /**
   * Displays an overlay on hover
   * @default true
   */
  overlay?: boolean;
  /** Text that appears in the overlay */
  overlayText?: string;
  /** Text that appears in the overlay when set in error state */
  errorOverlayText?: string;
  /**
   * Allows multiple files to be uploaded at once
   * @default true
   */
  allowMultiple?: boolean;
  /** Sets a disabled state */
  disabled?: boolean;
  /** Allows a file to be dropped anywhere on the page */
  dropOnPage?: boolean;
  /** Sets the default file dialog state */
  openFileDialog?: boolean;
  /** Allows child content to adjust height */
  variableHeight?: boolean;
  /** Adds custom validations */
  customValidator?(file: File): boolean;
}

const props = withDefaults(defineProps<DropZoneProps>(), {
  disabled: false,
  outline: true,
  overlay: true,
  type: 'file',
  allowMultiple: defaultAllowMultiple,
});

const lang = inject('lang') as Record<string, any>;

const slots = useSlots();

const attrs = useAttrs();

const emits = defineEmits<{
  (e: 'drop', files: File[], acceptedFiles: File[], rejectedFiles: File[]): void;
  (e: 'drop-accepted', acceptedFiles: File[]): void;
  (e: 'drop-rejected', rejectedFiles: File[]): void;
  (e: 'dragover'): void;
  (e: 'dragenter'): void;
  (e: 'dragleave'): void;
  (e: 'file-dialog-close'): void;
}>();

/**
 * Refs
 */
const { useUniqueId } = UseUniqueId();
const uniqueId = useUniqueId('DropZone', props.id);

const typeSuffix = capitalize(props.type);
const allowMultipleKey = createAllowMultipleKey(props.allowMultiple || false);

const dropZoneRef = ref<HTMLDivElement | null>(null);
const dragTargets = ref<HTMLElement[]>([]);

const measuring = ref(true);
const size = ref('large');
const dragging = ref(false);
const internalError = ref(false);
const focused = ref(false);

const overlayTextWithDefault = !props.overlayText
  ? lang.Polaris.DropZone[allowMultipleKey][`overlayText${typeSuffix}`]
  : props.overlayText;

const errorOverlayTextWithDefault = !props.errorOverlayText
  ? lang.Polaris.DropZone[`errorOverlayText${typeSuffix}`]
  : props.errorOverlayText;

const labelFallback = lang.Polaris.DropZone[allowMultipleKey][`label${typeSuffix}`];

/**
 * Computed
 */
const labelHiddenValue = computed(() => slots.label || props.label ? props.labelHidden : true);

const classes = computed(() => {
  return classNames(
    styles.DropZone,
    props.outline && styles.hasOutline,
    focused.value && styles.focused,
    (props.active || dragging.value) && styles.isDragging,
    props.disabled && styles.isDisabled,
    (internalError.value || props.error) && styles.hasError,
    !props.variableHeight && styles[variationName('size', size.value)],
    measuring.value && styles.measuring,
  );
});

const showDragOverlay = computed(() => {
  return (props.active || dragging.value)
    && !internalError.value
    && !props.error
    && props.overlay;
});

const showDragErrorOverlay = computed(() => {
  return dragging.value &&
  (internalError.value || props.error);
});

/**
 * Hooks
 */
onMounted(() => {
  adjustSize();

  const dropNode = props.dropOnPage ? document : dropZoneRef.value;

  if (!dropNode) { return; }

  dropNode.addEventListener('drop', handleDrop);
  dropNode.addEventListener('dragover', handleDragOver);
  dropNode.addEventListener('dragenter', handleDragEnter);
  dropNode.addEventListener('dragleave', handleDragLeave);
  window.addEventListener('resize', adjustSize);
});

onBeforeUnmount(() => {
  const dropNode = props.dropOnPage ? document : dropZoneRef.value;

  if (!dropNode) { return; }

  dropNode.removeEventListener('drop', handleDrop);
  dropNode.removeEventListener('dragover', handleDragOver);
  dropNode.removeEventListener('dragenter', handleDragEnter);
  dropNode.removeEventListener('dragleave', handleDragLeave);
  window.removeEventListener('resize', adjustSize);
});

/**
 * Methods
 */
const adjustSize = debounce(
  () => {
    if (!dropZoneRef.value) {
      return;
    }
    if (props.variableHeight) {
      measuring.value = false;
      return;
    }

    const width = dropZoneRef.value.getBoundingClientRect().width;

    size.value = 'large';
    if (width < 100) {
      size.value = 'small';
    } else if (width < 160) {
      size.value = 'medium';
    }

    if (measuring.value) { measuring.value = false; }
  },
  50,
  {trailing: true},
);

const handleFocus = () => {
  focused.value = true;
}

const handleBlur = () => {
  focused.value = false;
}

const onFileDialogClose = () => {
  emits('file-dialog-close');
}

const getValidatedFiles = (files: File[] | DataTransferItem[]) => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];

  Array.from(files as File[]).forEach((file: File) => {
    !fileAccepted(file, props.accept) ||
    (props.customValidator && !props.customValidator(file))
      ? rejectedFiles.push(file)
      : acceptedFiles.push(file);
  });

  if (!props.allowMultiple) {
    acceptedFiles.splice(1, acceptedFiles.length);
    rejectedFiles.push(...acceptedFiles.slice(1));
  }

  return { files, acceptedFiles, rejectedFiles };
}

const handleDrop = (event: Event) => {
  stopEvent(event);

  if (props.disabled) { return; }

  const fileList = getDataTransferFiles(event);

  const { files, acceptedFiles, rejectedFiles } = getValidatedFiles(fileList);

  dragTargets.value = [];

  dragging.value = false;
  internalError.value = rejectedFiles.length > 0;

  emits('drop', files as File[], acceptedFiles, rejectedFiles);
  if (acceptedFiles.length > 0) {
    emits('drop-accepted', acceptedFiles);
  }
  if (rejectedFiles.length > 0) {
    emits('drop-rejected', rejectedFiles);
  }

  (event.target as HTMLInputElement).value = '';
}

const handleDragEnter = (event: Event) => {
  stopEvent(event);

  if (props.disabled) { return; }

  const fileList = getDataTransferFiles(event);

  if (event.target && !dragTargets.value.includes(event.target as HTMLElement)) {
    dragTargets.value.push(event.target as HTMLElement);
  }

  if (dragging.value) { return; }

  const { rejectedFiles } = getValidatedFiles(fileList);

  dragging.value = true;
  internalError.value = rejectedFiles.length > 0;

  emits('dragenter');
}

const handleDragOver = (event: Event) => {
  stopEvent(event);

  if (props.disabled) { return; }

  emits('dragover');
}

const handleDragLeave = (event: Event) => {
  event.preventDefault();

  if (props.disabled) { return; }

  dragTargets.value = dragTargets.value.filter((el) => {
    const compareNode = props.dropOnPage && !isServer ? document.body : el;

    return el !== event.target && compareNode && compareNode.contains(el);
  });

  if (dragTargets.value.length > 0) { return; }

  dragging.value = false;
  internalError.value = false;

  emits('dragleave');
}

const open = () => {
  const fileInputNode = dropZoneRef.value && dropZoneRef.value.querySelector(`#${uniqueId}`);
  fileInputNode &&
    fileInputNode instanceof HTMLElement &&
    fileInputNode.click();
}

function handleClick(event: Event) {
  if (props.disabled) { return; }

  return attrs['onClick'] ? (attrs['onClick'] as any)(event) : open();
}

const stopEvent = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Provide
 */

const context = reactive({
  disabled: props.disabled,
  focused: focused,
  size: size,
  type: props.type,
  measuring: measuring,
  allowMultiple: props.allowMultiple,
});
provide('dropZoneContext', context);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/DropZone/DropZone.scss';
</style>

