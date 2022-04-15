<template lang="pug">
Popover(
  ref="popoverRef",
  :active="popoverActive",
  @close="handleClose",
  autofocusTarget="none",
  preventFocusOnClose,
  fullWidth,
  :preferInputActivator="false",
  :preferredPosition="preferredPosition",
)
  template(#activator, v-if="slots.activator")
    slot(name="activator")
  template(#content, v-if="slots.default")
    Pane(@scrolled-to-bottom="$emit('scrolled-to-bottom')")
      div(:class="styles.Listbox")
        slot
</template>

<script setup lang="ts">
import { provide, ref, computed, useSlots } from 'vue';
import styles from '@/classes/Combobox.json';
import type { PreferredPosition } from '../PositionedOverlay/math';
import { Popover, Pane } from '../Popover';

interface ComboboxProps {
  allowMultiple?: boolean;
  preferredPosition?: PreferredPosition;
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  preferredPosition: 'below',
});

provide('comboboxListboxOptionContext', { allowMultiple: props.allowMultiple });

const emits = defineEmits<{
  (event: 'scrolled-to-bottom'): void
}>()

const popoverActive = ref(false);
const activeOptionId = ref('');
const textFieldLabelId = ref('');
const listboxId = ref('');
const textFieldFocused = ref(false);
const disableCloseOnSelect = ref(false);
const popoverRef = ref(null);

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const shouldOpen = computed(() => !popoverActive.value && defaultSlot);

const handleClose = (): void =>  {
  if (!disableCloseOnSelect.value) {
    popoverActive.value = false;
  }

  activeOptionId.value = '';
};

const handleOpen = (): void => {
  popoverActive.value = true;
  activeOptionId.value = '';
};

const onOptionSelected = (): void => {
  if (!props.allowMultiple) {
    handleClose();
    return;
  } else {
    disableCloseOnSelect.value = true;
    activeOptionId.value = '';
  }

  // TODO: waiting for forceUpdatePosition method in Popover
  (popoverRef.value as any).forceUpdatePosition();
};

const handleFocus = (): void => {
  if (shouldOpen.value) {
    handleOpen();
  }
};

const handleChange = (): void => {
  if (shouldOpen.value) {
    popoverActive.value = true;
  }
};

const handleBlur = (): void => {
  disableCloseOnSelect.value = false;

  if (popoverActive.value) {
    handleClose();
  }
};

const comboboxTextFieldContext = {
  activeOptionId: activeOptionId.value,
  expanded: popoverActive.value,
  listboxId: listboxId.value,
  setTextFieldFocused: (value: boolean) => { textFieldFocused.value = value; },
  setTextFieldLabelId: (id: string) => { textFieldLabelId.value = id; },
  onTextFieldFocus: handleFocus,
  onTextFieldChange: handleChange,
  onTextFieldBlur: handleBlur,
};
provide('comboboxTextFieldContext', comboboxTextFieldContext);

const comboboxListboxContext = {
  setActiveOptionId: (id: string) => { activeOptionId.value = id; },
  setListboxId: (id: string) => { listboxId.value = id; },
  listboxId: listboxId.value,
  textFieldLabelId: textFieldLabelId.value,
  onOptionSelected: onOptionSelected,
  textFieldFocused: textFieldFocused.value,
  onKeyToBottom: () => { emits('scrolled-to-bottom'); },
};
provide('comboboxListboxContext', comboboxListboxContext);
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Combobox/Combobox.scss';
</style>
