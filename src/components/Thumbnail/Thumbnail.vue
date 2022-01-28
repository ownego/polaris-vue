<template lang="pug">
span(:class="className")
  PImage(
    v-if="typeof source === 'string'",
    :alt="alt",
    :source="source",
  )
  Icon(v-else, :accessibilityLabel="alt", :source="source")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import type { IconSource } from 'types/type';
import styles from '@/classes/Thumbnail.json';
import { PImage } from '../Image';
import { Icon } from '../Icon';

type Size = 'small' | 'medium' | 'large';

@Component({
  components: {
    PImage,
    Icon,
  },
})
export default class Thumbnail extends Vue {
  /**
   * Size of thumbnail
   * @values small | medium | large
   */
  @Prop({ type: String, default: 'medium' })
  public size!: Size;

  /**
   * URL for the image
   */
  @Prop({ required: true })
  public source!: string | IconSource;

  /**
   * Alt text for the thumbnail image
   */
  @Prop({ type: String, required: true })
  public alt!: string;

  get className() {
    const size = variationName('size', this.size) as keyof typeof styles;

    return classNames(
      styles.Thumbnail,
      size && styles[size],
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Thumbnail/Thumbnail.scss';
</style>
