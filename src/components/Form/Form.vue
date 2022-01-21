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

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { VisuallyHidden } from '../VisuallyHidden';

@Component({
  components: {
    VisuallyHidden,
  },
})
export default class Form extends Vue {
  /** Toggles if form submits on Enter keypress. Defaults to true. */
  @Prop({ type: Boolean, default: true })
  public implicitSubmit?: boolean;

  /** Blocks the default form action */
  @Prop({ type: Boolean })
  public preventDefault?: boolean;

  submitHandle(e: Event) {
    if (this.preventDefault) {
      e.preventDefault();
    }

    this.$emit('submit', e);
  }
}
</script>
