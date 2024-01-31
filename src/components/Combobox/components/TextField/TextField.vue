<template lang="pug">
PolarisTextField(
  v-bind="props",
  :id="`${textFieldId}`",
  v-model="model",
  aria-haspopup="listbox",
  :aria-autocomplete="ariaAutocomplete",
  :aria-active-descendant="activeOptionId",
  :aria-controls="listboxId",
  role="combobox",
  :aria-expanded="expanded",
  @focus="handleFocus",
  @blur="handleBlur",
  @change="handleChange",
)
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { labelId } from '@/components/Label/utils';
import { TextField as PolarisTextField } from '@/components';
import type { TextFieldProps, TextFieldEvents } from '@/components/TextField/types';
import useId from '@/use/useId';
import { useComboboxTextField } from '../../context';


const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  ariaAutocomplete: 'list',
});
const emits = defineEmits<TextFieldEvents>();

const model = defineModel<string>();

const {
  activeOptionId,
  listboxId,
  expanded,
  setTextFieldFocused,
  setTextFieldLabelId,
  onTextFieldFocus,
  onTextFieldChange,
  onTextFieldBlur,
} = useComboboxTextField();

const uniqueId = useId();
const textFieldId = computed(() => props.id ?? uniqueId);

const fieldLabelId = computed(() => labelId(String(props.id || uniqueId)));

watch(
  () => fieldLabelId.value,
  (newVal) => {
    if (setTextFieldLabelId) setTextFieldLabelId(newVal);
  }
);

const handleFocus = (event: FocusEvent) => {
  emits('focus', event);
  if(onTextFieldFocus) onTextFieldFocus();
  if(setTextFieldFocused) setTextFieldFocused(true);
};

const handleBlur = (event: FocusEvent) => {
  emits('blur', event);
  if(onTextFieldBlur) onTextFieldBlur();
  if(setTextFieldFocused) setTextFieldFocused(false);
};

const handleChange = (value: string, id: string) => {
  emits('change', value, id);
  if (onTextFieldChange) onTextFieldChange(value);
}
</script>
