<template lang="pug">
span(
  :aria-label="label",
  role="img",
  :class="className",
)
  span(v-if="!hasImage", :class="initialsClass")
    svg(:class="svgClass", viewBox="0 0 40 40")
      path(v-if="customer || !initials", fill="currentColor", :d="svgPath")
      text(
        v-else,
        x="50%",
        y="50%",
        :dy="verticalOffset",
        fill="currentColor",
        fontSize="20",
        textAnchor="middle",
      ) {{ initials }}
  PImage(
    v-if="source && status !== Status.Errored",
    :class="imageClass",
    :source="source",
    alt="",
    role="presentation",
    @load="handleLoad",
    @error="handleError",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Avatar.json';
import { styleClass } from './utils';
import { PImage } from '../Image';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

enum Status {
  Pending = 'PENDING',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
}

@Component({
  components: {
    PImage,
  },
})
export default class Avatar extends Vue {
  /**
   * Size of Avatar
   */
  @Prop({ type: String, default: 'medium' })
  public size!: Size;

  /**
   * The name of the person
   */
  @Prop({ type: String })
  public name?: string;

  /**
   * Initials of person to display
   */
  @Prop({ type: String })
  public initials?: string;

  /**
   * Whether the avatar is for a customer
   */
  @Prop({ type: Boolean })
  public customer!: boolean;

  /**
   * URL of the avatar image which falls back to initials if the image fails to load
   */
  @Prop({ type: String })
  public source?: string;

  /**
   * Accessible label for the avatar image
   */
  @Prop({ type: String })
  public accessibilityLabel?: string;

  public status = Status.Pending;

  public initialsClass = styles.Initials;

  public svgClass = styles.Svg;

  public imageClass = styles.Image;

  public svgPath = 'M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z';

  // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
  public verticalOffset = '0.35em';

  get hasImage() {
    return this.source && this.status !== Status.Errored;
  }

  get className() {
    const size = variationName('size', this.size) as keyof typeof styles;
    const style = variationName('style', styleClass(this.name || this.initials)) as keyof typeof styles;

    return classNames(
      styles.Avatar,
      size && styles[size],
      !this.customer && styles[style],
      (this.hasImage || (this.initials && this.initials.length === 0))
      && this.status !== Status.Loaded
      && styles.hidden,
      this.hasImage && styles.hasImage,
    );
  }

  get label() {
    if (this.accessibilityLabel) return this.accessibilityLabel;
    if (this.name) return this.name;
    if (this.initials) {
      const splitInitials = this.initials.split('').join(' ');
      return `Avatar with initials ${splitInitials}`;
    }
    return 'Avatar';
  }

  public handleLoad() {
    this.status = Status.Loaded;
  }

  public handleError() {
    this.status = Status.Errored;
    this.$emit('error');
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Avatar/Avatar.scss';
</style>
