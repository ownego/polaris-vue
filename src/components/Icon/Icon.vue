<template lang="pug">
span(
  :class="className",
  :aria-label="accessibilityLabel",
)
  component(
    v-if="sourceType === 'shopify-icon'",
    :is="shopifyIcon",
  )
  div(
    v-else-if="sourceType === 'placeholder'",
    :class="placeholderClassName",
  )
  img(
    v-else,
    :class="externalClassName",
    :src="`data:image/svg+xml;utf8,${source}`",
    aria-hidden="true",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import * as ShopifyIcons from '@shopify/polaris-icons/dist';
import styles from '@/classes/Icon.json';

type Color =
  | 'base'
  | 'subdued'
  | 'critical'
  | 'interactive'
  | 'warning'
  | 'highlight'
  | 'success'
  | 'primary';

const COLORS_WITH_BACKDROPS: string[] = [
  'base',
  'critical',
  'highlight',
  'success',
  'warning',
];

@Component
export default class Icon extends Vue {
  /**
   * The contents to display
   * @values Shopify icons name| placeholder | svg
   */
  @Prop({ type: String })
  public source!: string;

  /**
   * Set the color for the SVG fill
   * @values base
   * | subdued
   * | critical
   * | interactive
   * | warning
   * | highlight
   * | success
   * | primary
   */
  @Prop({ type: String })
  public color!: Color;

  /**
   * Show a backdrop behind the icon
   */
  @Prop({ type: Boolean, default: false })
  public backdrop!: boolean;

  /**
   * Descriptive text to be read to screenreaders
   */
  @Prop({ type: String })
  public accessibilityLabel!: string;

  get sourceType(): string {
    if (Object.keys(ShopifyIcons).some((icon) => icon === this.source)) {
      return 'shopify-icon';
    }

    if (this.source === 'placeholder') {
      return 'placeholder';
    }

    return 'external';
  }

  created(): void {
    this.checkSupportedSvg();
    this.checkSupportedBackdrop();
  }

  get shopifyIcon(): string {
    const iconVariation = this.source as keyof typeof ShopifyIcons;
    return ShopifyIcons[iconVariation];
  }

  get className(): string {
    const variation = this.color
      && variationName('color', this.color) as keyof typeof styles;

    return classNames(
      styles.Icon,
      styles[variation],
      this.color && styles.applyColor,
      this.backdrop && styles.hasBackdrop,
    );
  }

  get placeholderClassName(): string {
    return classNames(
      this.sourceType === 'placeholder' && styles.Placeholder,
    );
  }

  get externalClassName(): string {
    return classNames(
      this.sourceType === 'external' && styles.Img,
    );
  }

  checkSupportedSvg(): void {
    if (
      this.color
      && this.sourceType === 'external'
      && process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'Recoloring external SVGs is not supported. Set the intended color on your SVG instead.',
      );
    }
  }

  checkSupportedBackdrop(): void {
    if (
      this.backdrop
      && this.color
      && !COLORS_WITH_BACKDROPS.includes(this.color)
      && process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `The ${this.color} variant does not have a supported backdrop color`,
      );
    }
  }
}
</script>
<style lang="scss">
@import 'polaris-react/src/components/Icon/Icon.scss';
</style>
