<template lang="pug">
button(
  v-if="hasEventClick",
  type="button",
  :disabled="disabled",
  :class="className",
  @click="$emit('click')",
)
  slot
span(
  v-else,
  :class="className",
)
  a(
    v-if="url && !disabled",
    :class="classLink",
    :href="url",
  )
    span(
      :title="tagTitle",
      :class="classLinkText",
    )
      slot
  span(
    v-else,
    :title="tagTitle",
    :class="classTagText",
  )
    slot
  button(
    v-if="hasEventRemove",
    type="button",
    :aria-label="ariaLabel",
    :class="classRemove",
    :disabled="disabled",
    @click="$emit('remove')",
    @mouseup="onMouseUp",
  )
    Icon(:source="iconCancelSmallMinor")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import CancelSmallMinor from '@icons/CancelSmallMinor.svg';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import styles from '@/classes/Tag.json';
import { Icon } from '../Icon';

@Component({
  components: {
    Icon,
  },
})
export default class Tag extends Vue {
  /** Disables the tag  */
  @Prop({ type: Boolean, default: false })
  public disabled?: boolean;

  /** A string to use when tag has more than textual content */
  @Prop({ type: String })
  public accessibilityLabel?: string;

  /** Url to navigate to when tag is clicked or keypressed. */
  @Prop({ type: String })
  public url?: string;

  public classLinkText = classNames(styles.LinkText);

  public classTagText = classNames(styles.TagText);

  public iconCancelSmallMinor = CancelSmallMinor;

  public onMouseUp = handleMouseUpByBlurring;

  get hasEventClick() {
    return !!this.$listeners.click;
  }

  get hasEventRemove() {
    return !!this.$listeners.remove;
  }

  get segmented() {
    return this.hasEventClick && this.url;
  }

  get className() {
    return classNames(
      styles.Tag,
      this.disabled && styles.disabled,
      this.hasEventClick && styles.clickable,
      this.hasEventRemove && styles.removable,
      this.url && !this.disabled && styles.linkable,
      this.segmented && styles.segmented,
    );
  }

  get classLink() {
    return classNames(styles.Link, this.segmented && styles.segmented);
  }

  get classRemove() {
    return classNames(styles.Button, this.segmented && styles.segmented);
  }

  get tagTitle() {
    if (this.accessibilityLabel) return this.accessibilityLabel;

    if (this.$slots.default && this.$slots.default[0].text) return this.$slots.default[0].text;

    return undefined;
  }

  get ariaLabel() {
    return `Remove ${this.tagTitle || ''}`;
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Tag/Tag.scss';
</style>
