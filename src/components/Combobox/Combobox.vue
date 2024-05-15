<template lang="pug">
Popover(
  ref="popoverRef",
  :active="popoverActiveWithChildren",
  autofocus-target="none",
  prevent-focus-on-close,
  full-width,
  :prefer-input-activator="false",
  :preferred-position="preferredPosition",
  @close="handleClose",
)
  template(#activator)
    slot(name="activator")

  Pane(
    v-if="hasSlot(slots.default)",
    :height="height",
    :max-height="maxHeight",
    :min-height="minHeight",
    @scrolled-to-bottom="onScrolledToBottom",
  )
    div(:class="styles.Listbox")
      slot
</template>

<script setup lang="ts">
import { type VNode, ref, computed, provide } from 'vue';
import { Popover, type PopoverProps } from '@/components';
import type { VueNode, ComboboxListboxType } from '@/utilities/types';
import type { ComboboxListboxOptionType } from '@/use/useListbox';
import { useHasSlot } from '@/use/useHasSlot';

import styles from '@polaris/components/Combobox/Combobox.module.css';
import type { ComboboxTextFieldType } from './context';

export type ComboboxProps = {
  /** Allows more than one option to be selected */
  allowMultiple?: boolean;
  /**
   * The preferred direction to open the popover
   * @default 'below'
  */
  preferredPosition?: PopoverProps['preferredPosition'];
  /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  /** Height to set on the Popover Pane. */
  height?: string;
  /** Callback fired when the bottom of the listbox is reached. Use to lazy load when listbox option data is paginated. */
  maxHeight?: string;
  /** Min Height to set on the Popover Pane. */
  minHeight?: string;
};

type ComboboxSlots = {
  /** The content to display inside the popover */
  default: (_?: VueNode) => VNode[];
  /** The text field component to activate the Popover */
  activator: (_?: VueNode) => VNode[];
};

type ComboboxEvents = {
  /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
  'scrolled-to-bottom': [];
  /** Callback fired when the popover closes */
  'close': [];
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  preferredPosition: 'below',
});
const slots = defineSlots<ComboboxSlots>();
const emits = defineEmits<ComboboxEvents>();

const { hasSlot } = useHasSlot();

const popoverRef = ref<InstanceType<typeof Popover> | null>();
const popoverActive = ref(false);
const activeOptionId = ref<string>();
const textFieldLabelId = ref<string>();
const listboxId = ref<string>();
const textFieldFocused = ref(false);

const shouldOpen = computed(() => !popoverActive.value);

const popoverActiveWithChildren = computed(() => popoverActive.value && hasSlot(slots.default));
const isWillLoadMoreOptions = computed(() => Boolean(props.willLoadMoreOptions));

const setTextFieldFocused = (focused: boolean) => {
  textFieldFocused.value = focused;
};

const setTextFieldLabelId = (id: string) => {
  textFieldLabelId.value = id;
};

const setActiveOptionId = (id: string) => {
  activeOptionId.value = id;
};

const setListboxId = (id: string) => {
  listboxId.value = id;
};

const handleClose = () => {
  popoverActive.value = false;
  emits('close');

  activeOptionId.value = undefined;
};

const handleOpen = () => {
  popoverActive.value = true;
  activeOptionId.value = undefined;
};

const onOptionSelected = () => {
  if (!props.allowMultiple) {
    handleClose();
    return;
  }

  popoverRef.value?.forceUpdatePosition();
};

const handleFocus = () => {
  if (shouldOpen.value) {
    handleOpen();
  }
};

const handleChange = () => {
  if (shouldOpen.value) {
    handleOpen();
  }
};

const handleBlur = () => {
  if (popoverActive.value) {
    handleClose();
  }
};

const onScrolledToBottom = () => {
  emits('scrolled-to-bottom');
};

provide<ComboboxTextFieldType>('combobox-textfield', {
  activeOptionId,
  listboxId,
  expanded: popoverActive,
  setTextFieldFocused,
  setTextFieldLabelId,
  onTextFieldFocus: handleFocus,
  onTextFieldChange: handleChange,
  onTextFieldBlur: handleBlur,
});

provide<ComboboxListboxType>('combobox-listbox', {
  listboxId,
  textFieldLabelId,
  textFieldFocused,
  willLoadMoreOptions: isWillLoadMoreOptions,
  onOptionSelected,
  setActiveOptionId,
  setListboxId,
  onKeyToBottom: onScrolledToBottom,
});

provide<ComboboxListboxOptionType>('combobox-listbox-option', {
  allowMultiple: props.allowMultiple,
});
</script>
