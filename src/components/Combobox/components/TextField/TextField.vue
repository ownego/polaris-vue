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
  @input="handleInput",
)
  template(v-if="hasSlot(slots.label) || label", #label)
    slot(v-if="hasSlot(slots.label)", name="label")
    template(v-else) {{ label }}

  template(v-if="hasSlot(slots.helpText) || helpText", #helpText)
    slot(v-if="hasSlot(slots.helpText)", name="helpText")
    template(v-else) {{ helpText }}

  template(v-if="Boolean(slots.connectedLeft)", #connectedLeft)
    slot(name="connectedLeft")

  template(v-if="Boolean(slots.connectedRight)", #connectedRight)
    slot(name="connectedRight")

  template(v-if="hasSlot(slots.prefix) || prefix", #prefix)
    slot(v-if="hasSlot(slots.prefix)", name="prefix")
    template(v-else) {{ prefix }}

  template(v-if="hasSlot(slots.suffix) || suffix", #suffix)
    slot(v-if="hasSlot(slots.suffix)", name="suffix")
    template(v-else) {{ suffix }}

  template(v-if="hasSlot(slots.verticalContent) || verticalContent", #verticalContent)
    slot(v-if="hasSlot(slots.verticalContent)", name="verticalContent")
    template(v-else) {{ verticalContent }}

</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { labelId } from '@/components/Label/utils';
import { TextField as PolarisTextField } from '@/components';
import { type TextFieldProps, type TextFieldEvents, type TextFieldSlots } from '@/components/TextField/types';
import useId from '@/use/useId';
import { useHasSlot } from '@/use/useHasSlot';
import { useComboboxTextField } from '../../context';


const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  ariaAutocomplete: 'list',
});
const slots = defineSlots<TextFieldSlots>();
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
const { hasSlot } = useHasSlot();
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
};

const handleInput = (e: InputEvent, value: string) => {
  model.value = value;
  emits('input', e, value);
  if (onTextFieldChange) onTextFieldChange(value);
};
</script>
