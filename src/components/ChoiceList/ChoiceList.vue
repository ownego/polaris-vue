<template lang="pug">
BlockStack(
  as="fieldset"
  :gap="{xs: '400', md: '0'}"
  :aria-invalid="error != null"
  :id="finalName"
)
  Box(
    v-if="hasSlot(slots.title) || title"
    as="legend"
    :padding-block-end="{xs: '0', md: '100'}"
  )
    Text(
      as="span",
      variant="bodyMd",
      :visually-hidden="titleHidden",
    )
      slot(v-if="hasSlot(slots.title)", name="title")
      template(v-else) {{ title }}

  BlockStack(
    as="ul"
    :gap="{xs: '400', md: '0'}"
  )
    li(
      v-for="choice in choices",
      :key="choice.value",
    )
      Bleed(:margin-block-end="choice.helpText ? {xs: '100', md: '0'} : {xs: '0'}")
        component(
          :is="allowMultiple ? Checkbox : RadioButton"
          :name="finalName"
          :value="choice.value"
          :id="choice.id"
          :disabled="choice.disabled || disabled"
          :fill="{xs: true, sm: false}"
          :checked="choiceIsSelected(choice)"
          :aria-describedby="error && choice.describedByError ? errorTextID(finalName) : undefined"
          :tone="tone"
          @change="handleChange"
        )
          template(#label, v-if="choice.label") {{ choice.label }}
          template(
            #helpText,
            v-if="choice.helpText",
          )
            span(v-html="choice.helpText")

        div(
          v-if="choice.renderChildren",
          :class="styles.ChoiceChildren",
        )
          Box(:padding-block-start="{xs: '400', md: '0'}")
            component(:is="choice.renderChildren")
  Box(
    v-if="error"
    :padding-block-start="{xs: '0', md: '100'}"
    padding-block-end="200"
  )
    InlineError(:message="error" :field-id="finalName")
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import { useHasSlot } from '@/use/useHasSlot';
// @ts-ignore Note: using component:is in template
import { Box, Bleed, BlockStack, Checkbox, InlineError, RadioButton, Text } from '@/components';
import { errorTextID } from '@/components/InlineError/utils';
import type { Choice, ChoiceListProps, ChoiceListSlots, ChoiceListEvents } from './types';
import styles from '@polaris/components/ChoiceList/ChoiceList.module.css';

const props = withDefaults(defineProps<ChoiceListProps>(), {
  disabled: false,
});
const slots = defineSlots<ChoiceListSlots>();
const emits = defineEmits<ChoiceListEvents>();

const model = defineModel<string[]>({
  default: [],
});

const { hasSlot } = useHasSlot();

const uniqId = getCurrentInstance()?.uid;
const name = computed(() => String(props.name ?? uniqId));
const finalName = computed(() => props.allowMultiple ? `${name.value}[]` : name.value);

const handleChange = (checked: boolean, value: string): void => {
  const newValue = updateSelectedChoices(value, checked);

  model.value = newValue;
  emits('change', newValue, finalName.value);
}

const choiceIsSelected = ({value}: Choice) => {
  return model.value.includes(value);
}

function updateSelectedChoices(
  value: string,
  checked: boolean,
) {
  if (checked) {
    return props.allowMultiple ? [...model.value, value] : [value];
  }

  return model.value.filter((selectedChoice) => selectedChoice !== value);
}
</script>
