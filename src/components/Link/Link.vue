<template lang="pug">
UnstyledLink(
  v-if="url || to",
  :to="to",
  :url="url",
  :external="external",
  :class="className",
  v-on="$listeners",
  data-polaris-unstyled="true",
)
  <!-- Slot for displaying content inside the link -->
  slot
button(
  v-else,
  type="button",
  :class="className",
  v-on="$listeners",
)
  <!-- Slot for displaying content inside the link -->
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Link.json';
import { UnstyledLink } from '../UnstyledLink';

@Component({
  components: {
    UnstyledLink,
  },
})
export default class Link extends Vue {
  /**
   * The url to Link to
   */
  @Prop({ type: String })
  public url!: string

  /**
   * Set to for vue-router
   */
  @Prop({ type: [String, Object] })
  public to!: string | object

  /**
   * Makes the link open in new tab
   */
  @Prop({ type: Boolean, default: false })
  public external!: boolean

  /**
   * Makes the link color the same as the current text color
   * and adds an underline
   */
  @Prop({ type: Boolean, default: false })
  public monochrome!: boolean

  /**
   * Removes text decoration underline to the link
   */
  @Prop({ type: Boolean, default: false })
  public removeUnderline!: boolean

  get className(): string {
    return classNames(
      styles.Link,
      this.monochrome && styles.monochrome,
      this.removeUnderline && styles.removeUnderline,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Link/Link.scss';
</style>
