<template lang="pug">
div(
  v-if="connectedDisclosure",
  :class="connectedDisclosureWrapperClass"
)
  ButtonMarkup(
    v-on="{...$listeners, mouseup: onMouseUp}",
    v-bind="buttonMarkupProps",
  )
    slot
  Popover(
    :active="disclosureActive",
    preferredAlignment="right",
    @close="toggleDisclosureActive",
  )
    button(
      slot="activator",
      type="button",
      :class="connectedDisclosureClassName",
      :disabled="connectedDisclosureData.disabled",
      :aria-label="connectedDisclosureData.disclosureLabel",
      :aria-describedby="ariaDescribedBy",
      @click="toggleDisclosureActive",
      @mouseup="onMouseUp",
    )
      span
        Icon(:source="activatorSourceIcon")
    ActionList(
      slot="content",
      :items="connectedDisclosure.actions",
      @action-any-item="toggleDisclosureActive",
    )
      template(v-for="{prefixId, suffixId} in connectedDisclosure.actions")
        slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
        slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
ButtonMarkup(
  v-else
  v-on="{...$listeners, mouseup: onMouseUp}",
  v-bind="buttonMarkupProps",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import { ButtonProps } from './utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { Icon } from '../Icon';
import styles from '@/classes/Button.json';
import ButtonMarkup from './ButtonMarkup.vue';
import { handleMouseUpByBlurring } from '@/utilities/focus';

@Component({
  components: {
    VisuallyHidden,
    ButtonMarkup,
    ActionList,
    Popover,
    Icon,
  },
})
export default class Button extends Vue {
  /**
   * A unique identifier for the button
   */
  @Prop() public id?: ButtonProps['id'];

  /**
   * A destination to link to, rendered in the href attribute of a link
   */
  @Prop() public url?: ButtonProps['url'];

  /**
   * Forces url to open in a new tab
   */
  @Prop() public external?: ButtonProps['external'];

  /**
   * Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value
   */
  @Prop() public download?: ButtonProps['download'];

  /**
   * Allows the button to submit a form
   */
  @Prop() public submit?: ButtonProps['submit'];

  /**
   * Disables the button, disallowing merchant interaction
   */
  @Prop() public disabled?: ButtonProps['disabled'];

  /**
   * Replaces button text with a spinner while a background action is being performed
   */
  @Prop() public loading?: ButtonProps['loading'];

  /**
   * Sets the button in a pressed state
   */
  @Prop() public pressed?: ButtonProps['pressed'];

  /**
   * Visually hidden text for screen readers
   */
  @Prop() public accessibilityLabel?: ButtonProps['accessibilityLabel'];

  /**
   * A valid WAI-ARIA role to define the semantic value of this element
   */
  @Prop() public role?: ButtonProps['role'];

  /**
   * Id of the element the button controls
   */
  @Prop() public ariaControls?: ButtonProps['ariaControls'];

  /**
   * Tells screen reader the controlled element is expanded
   */
  @Prop() public ariaExpanded?: ButtonProps['ariaExpanded'];

  /**
   * Indicates the ID of the element that describes the button
   */
  @Prop() public ariaDescribedBy?: ButtonProps['ariaDescribedBy'];

  /**
   * Provides extra visual weight and identifies the primary action in a set of buttons
   */
  @Prop() public primary?: ButtonProps['primary'];

  /**
   * Indicates a dangerous or potentially negative action
   */
  @Prop() public destructive?: ButtonProps['destructive'];

  /**
   * Changes the size of the button, giving it more or less padding
   * @values slim | medium | large
   */
  @Prop({ default: 'medium' }) public size?: ButtonProps['size'];

  /**
   * Changes the inner text alignment of the button
   * @values left | center | right
   */
  @Prop() public textAlign?: ButtonProps['textAlign'];

  /**
   * Gives the button a subtle alternative to the default button styling,
   * appropriate for certain backdrops
   */
  @Prop() public outline?: ButtonProps['outline'];

  /**
   * Indicates a dangerous or potentially negative action
   */
  @Prop() public fullWidth?: ButtonProps['fullWidth'];

  /**
   * Displays the button with a disclosure icon. Defaults to `down` when set to true
   * @values down | up | select | boolean
   */
  @Prop() public disclosure?: ButtonProps['disclosure'];

  /**
   * Renders a button that looks like a link
   */
  @Prop() public plain?: ButtonProps['plain'];

  /**
   * Makes plain and outline Button colors (text, borders, icons) the same as the current text color
   * Also adds an underline to `plain` Buttons
   */
  @Prop() public monochrome?: ButtonProps['monochrome'];

  /**
   * Removes underline from button text (including on interaction)when monochrome and plain are true
   */
  @Prop() public removeUnderline?: ButtonProps['removeUnderline'];

  /**
   * Icon to display to the left of the button content
   */
  @Prop() public connectedDisclosure?: ButtonProps['connectedDisclosure'];

  /**
   * Disclosure button connected right of the button. Toggles a popover action list.
   */
  @Prop() public icon?: ButtonProps['icon'];

  get isDisabled() {
    return this.disabled || this.loading;
  }

  get className() {
    const textAlignVariation = this.textAlign
      && variationName('textAlign', this.textAlign) as keyof typeof styles;
    const sizeVariantion = this.size && variationName('size', this.size) as keyof typeof styles;

    return classNames(
      styles.Button,
      this.primary && styles.primary,
      this.outline && styles.outline,
      this.destructive && styles.destructive,
      this.isDisabled && styles.disabled,
      this.loading && styles.loading,
      this.plain && styles.plain,
      this.pressed && !this.disabled && !this.url && styles.pressed,
      this.monochrome && styles.monochrome,
      this.size !== 'medium' && sizeVariantion && styles[sizeVariantion],
      textAlignVariation && styles[textAlignVariation],
      this.fullWidth && styles.fullWidth,
      this.icon && this.children == null && styles.iconOnly,
      this.connectedDisclosure && styles.connectedDisclosure,
      this.removeUnderline && styles.removeUnderline,
    );
  }

  get connectedDisclosureClassName() {
    const textAlignVariantion = this.textAlign
      && variationName('textAlign', this.textAlign) as keyof typeof styles;
    const sizeVariantion = this.size && variationName('size', this.size) as keyof typeof styles;

    return classNames(
      styles.Button,
      this.primary && styles.primary,
      this.outline && styles.outline,
      this.size !== 'medium' && sizeVariantion && styles[sizeVariantion],
      textAlignVariantion && styles[textAlignVariantion],
      this.destructive && styles.destructive,
      this.connectedDisclosure && this.connectedDisclosure.disabled && styles.disabled,
      styles.iconOnly,
      styles.ConnectedDisclosure,
      this.monochrome && styles.monochrome,
    );
  }

  get commonProps() {
    const {
      id, className, accessibilityLabel, role, ariaDescribedBy,
    } = this;
    return {
      id, className, accessibilityLabel, role, ariaDescribedBy,
    };
  }

  get linkProps() {
    const { url, external, download } = this;
    return { url, external, download };
  }

  get actionProps() {
    const { submit, loading, pressed } = this;
    return {
      submit, loading, pressed, disabled: this.isDisabled,
    };
  }

  get buttonMarkupProps() {
    const {
      commonProps, linkProps, actionProps, removeUnderline, children, disclosure, loading, icon,
    } = this;
    return {
      commonProps, linkProps, actionProps, removeUnderline, children, disclosure, loading, icon,
    };
  }

  get connectedDisclosureData() {
    if (this.connectedDisclosure) {
      const {
        disabled,
        accessibilityLabel: disclosureLabel = 'Related actions',
      } = this.connectedDisclosure;

      return { disabled, disclosureLabel };
    }
    return {};
  }

  public onMouseUp = handleMouseUpByBlurring;

  public connectedDisclosureWrapperClass = styles.ConnectedDisclosureWrapper;

  public disclosureActive = false;

  public toggleDisclosureActive() {
    this.disclosureActive = !this.disclosureActive;
  }

  public activatorSourceIcon = CaretDownMinor;

  public children = !!this.$slots.default;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Button/Button.scss';
</style>
