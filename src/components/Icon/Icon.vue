<template lang="pug">
span(:class="wrapperClassName")
  VisuallyHidden
    span {{ accessibilityLabel }}
  component(
    v-if="sourceType === 'icon'",
    :is="shopifyIcon || source",
    :class="svgClassName",
  )
  div(
    v-else-if="sourceType === 'placeholder'",
    :class="placeholderClassName",
  )
  img(
    v-else,
    :class="externalClassName",
    :src="`data:image/svg+xml;utf8,${encodedSvg}`",
    aria-hidden="true",
  )
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { IconSource } from 'types/type';
import styles from '@/classes/Icon.json';
import { VisuallyHidden } from '../VisuallyHidden';

export const getPolarisIcon = async (
  iconName: string,
): Promise<VueConstructor<Vue>> => {
  const icon = await import(`!vue-svg-loader!@shopify/polaris-icons/dist/svg/${iconName}.svg`);
  return icon;
};

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

@Component({
  components: {
    VisuallyHidden,
  },
})
export default class Icon extends Vue {
  /**
   * The SVG contents to display in the icon
   * (icons should fit in a 20 × 20 pixel viewBox)
   */
  @Prop({ type: [String, Object, Function], required: true })
  public source!: IconSource;

  /**
   * Set the color for the SVG fill
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

  public shopifyIcon!: VueConstructor<Vue>;

  public sourceType = 'external';

  get encodedSvg(): string {
    return typeof this.source === 'string'
      ? encodeURIComponent(this.source)
      : '';
  }

  get wrapperClassName(): string {
    const variation = this.color
      && variationName('color', this.color) as keyof typeof styles;

    return classNames(
      styles.Icon,
      styles[variation],
      this.color && styles.applyColor,
      this.backdrop && styles.hasBackdrop,
    );
  }

  public svgClassName: string = styles.Svg;

  public placeholderClassName: string = styles.Placeholder;

  public externalClassName: string = styles.Img;

  created(): void {
    this.generateSourceType();
    this.checkSupportedSvg();
    this.checkSupportedBackdrop();
  }

  private async generateSourceType(): Promise<void> {
    if (['object', 'function'].includes(typeof this.source)) {
      this.sourceType = 'icon';
    }

    if (typeof this.source === 'string' && this.source !== 'placeholder') {
      const icon = await getPolarisIcon(this.source);

      if (icon) {
        this.shopifyIcon = icon;
        this.sourceType = 'icon';
      }
    }

    if (this.source === 'placeholder') {
      this.sourceType = 'placeholder';
    }
  }

  private checkSupportedSvg(): void {
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

  private checkSupportedBackdrop(): void {
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
