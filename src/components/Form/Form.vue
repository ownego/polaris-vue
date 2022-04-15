<template lang="pug">
form(
  :acceptCharset="acceptCharset || undefined",
  :action="action",
  :encType="encType",
  :method="method",
  :name="name"
  :noValidate="noValidate",
  :target="target",
  :autocomplete="autoCompleteInputs",
  @submit="submitHandle",
)
  VisuallyHidden(
    v-if="implicitSubmit",
  )
    button(
      type="submit",
      aria-hidden="true",
      tabIndex="-1",
    )
      | Submit
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VisuallyHidden } from '../VisuallyHidden';

type Enctype =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

type Method = 'post' | 'get' | 'action';

type Target = '_blank' | '_self' | '_parent' | '_top' | string;

/**
 * Setup
 */
interface Props {
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

const props = withDefaults(defineProps<Props>(),{
  implicitSubmit: true,
  method: 'post',
  preventDefault: true,
});

const emit = defineEmits<{ (event: 'submit', submitEvent: Event): void }>();

const autoCompleteInputs = computed(() => {
  if (typeof props.autoComplete === 'undefined') {
    return undefined;
  }

  return props.autoComplete ? 'on' : 'off';
});

/**
 * Methods
 */
const submitHandle = (e: Event) => {
  if (props.preventDefault) {
    e.preventDefault();
  }
  emit('submit', e);
}
</script>
