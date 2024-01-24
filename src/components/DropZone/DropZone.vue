<template lang="pug">
Labelled(
  :id="`${id}`",
  :label-hidden="labelHiddenValue",
  :action="labelAction",
)
  template(v-if="hasLabel", #label)
    slot(v-if="slots.label", name="label")
    template(v-else-if="label") {{ label }}
    template(v-else) {{ i18n.translate(`Polaris.DropZone.${allowMultipleKey}.label${typeSuffix}`) }}

  div(
    ref="dropNodeRef",
    :class="classes",
    :aria-disabled="disabled",
    @click="handleClick",
    @dragstart="stopEvent",
  )
    div(
      v-if="showDragOverlay",
      :class="styles.Overlay",
    )
      BlockStack(gap="200", inline-align="center")
        Icon(
          v-if="size === 'small'",
          :source="UploadIcon",
          tone="critical",
        )
        Text(
          v-else-if="size === 'medium' || size === 'large'",
          variant="bodySm",
          as="p",
          font-weight="bold",
        ) {{ overlayTextWithDefault }}

    div(
      v-if="showDragErrorOverlay",
      :class="styles.Overlay",
    )
      BlockStack(gap="200", inline-align="center")
        Icon(
          v-if="size === 'small'",
          :source="AlertCircleIcon",
          tone="critical",
        )
        Text(
          v-else-if="size === 'medium' || size === 'large'",
          variant="bodySm",
          as="p",
          font-weight="bold",
        ) {{ errorOverlayTextWithDefault }}

    Text(
      as="span",
      variant="bodySm",
      visually-hidden,
    )
      input(
        ref="inputRef",
        type="file",
        :id="`${id}`",
        :accept="accept",
        :multiple="allowMultiple",
        :disabled="disabled",
        autoComplete="off",
        @change="handleDrop",
        @focus="handleFocus",
        @blur="handleBlur",
      )

    div(:class="styles.Container")
      slot
</template>

<script setup lang="ts">
import { type VNode, provide, ref, computed, onMounted, watch, getCurrentInstance, reactive, onBeforeUnmount } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { capitalize } from '@polaris/utilities/capitalize';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import { useToggle } from '@/use/useToggle';
import useId from '@/use/useId';
import type { VueNode } from '@/utilities/types';
import { classNames, variationName } from '@/utilities/css';
import { BlockStack, Icon, Text, Labelled } from '@/components';
import type { LabelledProps } from '@/components/Labelled/types';
import type { DropZoneContextType } from './useDropZoneContext';
import {
  fileAccepted,
  getDataTransferFiles,
  defaultAllowMultiple,
  createAllowMultipleKey,
  type DropZoneEvent,
} from './utils';
import UploadIcon from '@icons/UploadIcon.svg';
import AlertCircleIcon from '@icons/AlertCircleIcon.svg';
import styles from '@polaris/components/DropZone/DropZone.module.scss';

export type DropZoneFileType = 'file' | 'image' | 'video';

export type DropZoneProps = {
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

type DropZoneSlots = {
  /** The child elements to render in the dropzone. */
  default: (_: VueNode) => VNode[];
  /** Label for the file input */
  label?: (_: VueNode) => VNode[];
}

type DropZoneEvents = {
  /** Callback triggered on click */
  'click': [event: MouseEvent];
  /** Callback triggered on any file drop */
  'drop': [files: File[], acceptedFiles: File[], rejectedFiles: File[]];
  /** Callback triggered when at least one of the files dropped was accepted */
  'drop-accepted': [acceptedFiles: File[]];
  /** Callback triggered when at least one of the files dropped was rejected */
  'drop-rejected': [rejectedFiles: File[]];
  /** Callback triggered when one or more files are dragging over the drag area */
  'drag-over': [];
  /** Callback triggered when one or more files entered the drag area */
  'drag-enter': [];
  /** Callback triggered when one or more files left the drag area */
  'drag-leave': [];
  /** Callback triggered when the file dialog is canceled */
  'file-dialog-close': [];
}

const props = withDefaults(defineProps<DropZoneProps>(), {
  disabled: false,
  outline: true,
  overlay: true,
  allowMultiple: defaultAllowMultiple,
  type: 'file',
});
const slots = defineSlots<DropZoneSlots>();
const emits = defineEmits<DropZoneEvents>();

const i18n = useI18n();
const uniqId = useId();
const { hasSlot } = useHasSlot();

const currentInstance = getCurrentInstance();

const dropNodeRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const dragTargets = ref<HTMLElement[]>([]);

const dragging = ref(false);
const internalError = ref(false);
const { value: focused, setTrue: handleFocus, setFalse: handleBlur } = useToggle(false);
const size = ref('large');
const measuring = ref(true);

const id = computed(() => props.id || uniqId);
const typeSuffix = computed(() => capitalize(props.type));
const allowMultipleKey = computed(() => createAllowMultipleKey(props.allowMultiple));

const overlayTextWithDefault = computed(() => !props.overlayText
  ? i18n.translate(`Polaris.DropZone.${allowMultipleKey.value}.overlayText${typeSuffix.value}`)
  : props.overlayText,
);

const errorOverlayTextWithDefault = computed(() => !props.errorOverlayText
  ? i18n.translate(`Polaris.DropZone.errorOverlayText${typeSuffix.value}`)
  : props.errorOverlayText,
);

const hasLabel = computed(() => hasSlot(slots.label) || props.label);

const labelHiddenValue = computed(() => props.label ? props.labelHidden : true);

const classes = computed(() => classNames(
  styles.DropZone,
  props.outline && styles.hasOutline,
  focused.value && styles.focused,
  (props.active || dragging.value) && styles.isDragging,
  props.disabled && styles.isDisabled,
  (internalError.value || props.error) && styles.hasError,
  !props.variableHeight && styles[variationName('size', size.value)],
  measuring.value && styles.measuring,
));

const showDragOverlay = computed(() => (
  (props.active || dragging.value)
  && !internalError.value
  && !props.error
  && props.overlay
));

const showDragErrorOverlay = computed(() => (dragging.value && (internalError.value || props.error)));

const adjustSize = debounce(() => {
  if (!dropNodeRef.value) return;

  if (props.variableHeight) {
    measuring.value = false;
    return;
  }

  let tmpSize = 'large';
  const width = dropNodeRef.value.getBoundingClientRect().width;

  if (width < 100) {
    tmpSize = 'small';
  } else if (width < 160) {
    tmpSize = 'medium';
  }

  size.value = tmpSize;
  if (measuring.value) measuring.value = false;
}, 50, { trailing: true });

const getValidatedFiles = (files: File[] | DataTransferItem[]) => {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];

  Array.from(files as File[]).forEach((file) => {
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
};

const handleDrop = (event: Event) => {
  stopEvent(event);

  if (props.disabled) return;

  const fileList = getDataTransferFiles(event as DropZoneEvent);

  const { files, acceptedFiles, rejectedFiles } = getValidatedFiles(fileList);

  dragTargets.value = [];
  dragging.value = false;
  internalError.value = rejectedFiles.length > 0;

  emits('drop', files as File[], acceptedFiles, rejectedFiles);
  acceptedFiles.length && emits('drop-accepted', acceptedFiles);
  rejectedFiles.length && emits('drop-rejected', rejectedFiles);

  if (!(event.target && 'value' in event.target)) return;

  event.target.value = '';
};

const handleDragEnter = (event: Event) => {
  stopEvent(event);

  if (props.disabled) return;

  const fileList = getDataTransferFiles(event as DropZoneEvent);

  if (event.target && !dragTargets.value.includes(event.target as HTMLElement)) {
    dragTargets.value.push(event.target as HTMLElement);
  }

  if (dragging.value) return;

  const { rejectedFiles } = getValidatedFiles(fileList);

  dragging.value = true;
  internalError.value = rejectedFiles.length > 0;

  emits('drag-enter');
};

const handleDragOver = (event: Event) => {
  stopEvent(event);

  if (props.disabled) return;

  emits('drag-over');
};

const handleDragLeave = (event: Event) => {
  stopEvent(event);

  if (props.disabled) return;

  dragTargets.value = dragTargets.value.filter((el) => {
    const compareNode = props.dropOnPage ? document : dropNodeRef.value;

    return el !== event.target && compareNode && compareNode.contains(el);
  });

  if (dragTargets.value.length > 0) return;

  dragging.value = false;
  internalError.value = false;

  emits('drag-leave');
};

const open = () => {
  if (!inputRef.value) return;
  inputRef.value.click();
};

const triggerFileDialog = () => {
  open();
  emits('file-dialog-close');
};

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return;

  if (currentInstance?.attrs.onClick) {
    emits('click', event);
  } else {
    open();
  }
};

const stopEvent = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

watch(
  () => props.openFileDialog,
  () => {
    if (props.openFileDialog) triggerFileDialog();
  },
);

onMounted(() => {
  adjustSize();

  const dropNode = props.dropOnPage ? document : dropNodeRef.value;

  if (!dropNode) return;

  dropNode.addEventListener('drop', handleDrop);
  dropNode.addEventListener('dragover', handleDragOver);
  dropNode.addEventListener('dragenter', handleDragEnter);
  dropNode.addEventListener('dragleave', handleDragLeave);
  window.addEventListener('resize', adjustSize);
});

onBeforeUnmount(() => {
  const dropNode = props.dropOnPage ? document : dropNodeRef.value;

  if (!dropNode) return;

  dropNode.removeEventListener('drop', handleDrop);
  dropNode.removeEventListener('dragover', handleDragOver);
  dropNode.removeEventListener('dragenter', handleDragEnter);
  dropNode.removeEventListener('dragleave', handleDragLeave);
  window.removeEventListener('resize', adjustSize);
});

const context = reactive<DropZoneContextType>({
  disabled: props.disabled,
  focused,
  size,
  type: props.type || 'file',
  measuring,
  allowMultiple: props.allowMultiple,
});

provide('dropZoneContext', context);
</script>
