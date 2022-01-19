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
  v-else,
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
import styles from '@/classes/Button.json';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import { ButtonProps } from './utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { Icon } from '../Icon';
import ButtonMarkup from './ButtonMarkup.vue';

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
  @Prop({ type: String }) public id?: string;

  /**
   * A destination to link to, rendered in the href attribute of a link
   */
  @Prop({ type: String }) public url?: string;

  /**
   * Forces url to open in a new tab
   */
  @Prop({ type: Boolean }) public external?: boolean;

  /**
   * Tells the browser to download the url instead of opening it.
   * Provides a hint for the downloaded filename if it is a string value
   */
  @Prop({ type: String }) public download?: string | boolean;

  /**
   * Allows the button to submit a form
   */
  @Prop({ type: Boolean }) public submit?: boolean;

  /**
   * Disables the button, disallowing merchant interaction
   */
  @Prop({ type: Boolean }) public disabled?: boolean;

  /**
   * Replaces button text with a spinner while a background action is being performed
   */
  @Prop({ type: Boolean }) public loading?: boolean;

  /**
   * Sets the button in a pressed state
   */
  @Prop({ type: Boolean }) public pressed?: boolean;

  /**
   * Visually hidden text for screen readers
   */
  @Prop({ type: String }) public accessibilityLabel?: string;

  /**
   * A valid WAI-ARIA role to define the semantic value of this element
   */
  @Prop({ type: String }) public role?: string;

  /**
   * Id of the element the button controls
   */
  @Prop({ type: String }) public ariaControls?: string;

  /**
   * Tells screen reader the controlled element is expanded
   */
  @Prop({ type: Boolean }) public ariaExpanded?: boolean;

  /**
   * Indicates the ID of the element that describes the button
   */
  @Prop({ type: String }) public ariaDescribedBy?: string;

  /**
   * Provides extra visual weight and identifies the primary action in a set of buttons
   */
  @Prop({ type: Boolean }) public primary?: boolean;

  /**
   * Indicates a dangerous or potentially negative action
   */
  @Prop({ type: Boolean }) public destructive?: boolean;

  /**
   * Changes the size of the button, giving it more or less padding
   * @values slim | medium | large
   */
  @Prop({ default: 'medium' }) public size?: ButtonProps['size'];

  /**
   * Changes the inner text alignment of the button
   * @values left | center | right
   */
  @Prop({ type: String }) public textAlign?: ButtonProps['textAlign'];

  /**
   * Gives the button a subtle alternative to the default button styling,
   * appropriate for certain backdrops
   */
  @Prop({ type: Boolean }) public outline?: boolean;

  /**
   * Indicates a dangerous or potentially negative action
   */
  @Prop({ type: Boolean }) public fullWidth?: boolean;

  /**
   * Displays the button with a disclosure icon. Defaults to `down` when set to true
   * @values down | up | select | boolean
   */
  @Prop({ type: String }) public disclosure?: ButtonProps['disclosure'];

  /**
   * Renders a button that looks like a link
   */
  @Prop({ type: Boolean }) public plain?: boolean;

  /**
   * Makes plain and outline Button colors (text, borders, icons) the same as the current text color
   * Also adds an underline to `plain` Buttons
   */
  @Prop({ type: Boolean }) public monochrome?: boolean;

  /**
   * Removes underline from button text (including on interaction)when monochrome and plain are true
   */
  @Prop({ type: Boolean }) public removeUnderline?: boolean;

  /**
   * Disclosure button connected right of the button. Toggles a popover action list.
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
    const sizeVariation = this.size && variationName('size', this.size) as keyof typeof styles;

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
      this.size !== 'medium' && sizeVariation && styles[sizeVariation],
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
