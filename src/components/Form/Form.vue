<template lang="pug">
form(@submit="submitHandle")
  slot
  VisuallyHidden(
    v-if="implicitSubmit",
  )
    button(
      type="submit",
      aria-hidden="true",
      tabIndex="-1",
    )
      | Submit
</template>

<script setup lang="ts">
import { VisuallyHidden } from '../VisuallyHidden';

/**
 * Setup
 */
interface Props {
  /** Toggles if form submits on Enter keypress. Defaults to true. */
  implicitSubmit?: boolean;
  /** Blocks the default form action */
  preventDefault?: boolean;
}

const props = withDefaults(defineProps<Props>(),{
  implicitSubmit: true,
});

const emit = defineEmits<{ (event: 'submit', submitEvent: Event): void }>();

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
