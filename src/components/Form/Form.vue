
<template lang="pug">
form(
  :acceptCharset="acceptCharset",
  :action="action",
  :autoComplete="autoCompleteInputs",
  :encType="encType",
  :method="method",
  :name="name",
  :noValidate="noValidate",
  :target="target",
  @submit="handleSubmit"
)
  Text(v-if="implicitSubmit", as="span", visually-hidden)
    button(type="submit", aria-hidden="true", tabindex="-1")
      | {{ i18n.translate('Polaris.Common.submit') }}
  slot
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue';
import { Text } from '@/components';
import useI18n from '@/use/useI18n';
import type { VueNode } from '@/utilities/types';

type Enctype =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

type Method = 'post' | 'get' | 'action';

type Target = '_blank' | '_self' | '_parent' | '_top' | string;

export type FormProps = {
  /** Space separated list of character encodings */
  acceptCharset?: string;
  /** Where to send form-data on submittal */
  action?: string;
  /** Grants the browser the ability to autocomplete input elements */
  autoComplete?: boolean;
  /** Media type when submitting content to server */
  encType?: Enctype;
  /** Toggles if form submits on Enter keypress. Defaults to true. */
  implicitSubmit?: boolean;
  /** Method used to submit form */
  method?: Method;
  /** A unique name for the form */
  name?: string;
  /** Whether or not form is validated when submitting */
  noValidate?: boolean;
  /** Blocks the default form action */
  preventDefault?: boolean;
  /** Where to display response after form submittal */
  target?: Target;
}

type FormSlots = {
  /** The content to display inside the form. */
  default: (_?: VueNode) => VNode[];
}

type FormEvents = {
  /** Callback when form is submitted */
  'submit': [e: Event];
}

const props = withDefaults(defineProps<FormProps>(), {
  method: 'post',
  implicitSubmit: true,
  preventDefault: true,
});
const slots = defineSlots<FormSlots>();
const emits = defineEmits<FormEvents>();

const i18n = useI18n();



const autoCompleteInputs = computed(() => {
  if (props.autoComplete == null) {
    return props.autoComplete;
  }

  return props.autoComplete ? 'on' : 'off';
});

const handleSubmit = (e: Event) => {
  if (!props.preventDefault) {
    return;
  }

  e.preventDefault();
  emits('submit', e);
}

</script>
