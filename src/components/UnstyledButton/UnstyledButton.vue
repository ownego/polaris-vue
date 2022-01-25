<template lang="pug">
a(v-if="url && disabled", v-bind="commonProps")
  slot
UnstyledLink(
  v-else-if="url && !disabled",
  v-bind="interactiveProps",
  :url="url",
  :external="external",
  :download="download",
  @click="$emit('click')",
  @focus="$emit('focus')",
  @blur="$emit('blur')",
  @mouseup="onMouseUp",
  @mouseover="$emit('mouseover')",
  @touchstart="$emit('touchstart')",
)
  slot
button(
  v-else,
  v-bind="interactiveProps",
  :type="submit ? 'submit' : 'button'",
  :disabled="disabled",
  :aria-busy="loading ? true : undefined",
  :aria-controls="ariaControls",
  :aria-expanded="ariaExpanded",
  :aria-describedby="ariaDescribedBy",
  :aria-pressed="pressed",
  v-on="$listeners",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { UnstyledLink } from '@/components/UnstyledLink';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { UnstyledButtonProps } from './utils';

@Component({
  components: {
    UnstyledLink,
  },
})
export default class UnstyledButton extends Vue {
  /**
   * A unique identifier for the button
   */
  @Prop() public id?: UnstyledButtonProps['id'];

  /**
   * A destination to link to, rendered in the href attribute of a link
   */
  @Prop() public url?: UnstyledButtonProps['url'];

  /**
   * Forces url to open in a new tab
   */
  @Prop() public external?: UnstyledButtonProps['external'];

  /**
   * Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value
   */
  @Prop() public download?: UnstyledButtonProps['download'];

  /**
   * Allows the button to submit a form
   */
  @Prop() public submit?: UnstyledButtonProps['submit'];

  /**
   * Disables the button, disallowing merchant interaction
   */
  @Prop() public disabled?: UnstyledButtonProps['disabled'];

  /**
   * Replaces button text with a spinner while a background action is being performed
   */
  @Prop() public loading?: UnstyledButtonProps['loading'];

  /**
   * Sets the button in a pressed state
   */
  @Prop() public pressed?: UnstyledButtonProps['pressed'];

  /**
   * Visually hidden text for screen readers
   */
  @Prop() public accessibilityLabel?: UnstyledButtonProps['accessibilityLabel'];

  /**
   * A valid WAI-ARIA role to define the semantic value of this element
   */
  @Prop() public role?: UnstyledButtonProps['role'];

  /**
   * Id of the element the button controls
   */
  @Prop() public ariaControls?: UnstyledButtonProps['ariaControls'];

  /**
   * Tells screen reader the controlled element is expanded
   */
  @Prop() public ariaExpanded?: UnstyledButtonProps['ariaExpanded'];

  /**
   * Indicates the ID of the element that describes the button
   */
  @Prop() public ariaDescribedBy?: UnstyledButtonProps['ariaDescribedBy'];

  /**
   * A custom class name to apply styles to button
   */
  @Prop() public className?: UnstyledButtonProps['className'];

  @Prop() public rest?: UnstyledButtonProps['[key: string]'];

  get commonProps() {
    return {
      id: this.id,
      class: this.className,
      'aria-label': this.accessibilityLabel,
    };
  }

  get interactiveProps() {
    return {
      ...this.commonProps,
      ...this.rest,
      role: this.role,
    };
  }

  public onMouseUp = handleMouseUpByBlurring;
}
</script>
