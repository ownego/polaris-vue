<template lang="pug">
div(
  :class="className",
  :data-buttongroup-segmented="segmented",
  :data-buttongroup-connected-top="connectedTop",
  :data-buttongroup-full-width="fullWidth",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ButtonGroup.json';

type Spacing = 'extraTight' | 'tight' | 'loose';

@Component
export default class ButtonGroup extends Vue {
  /**
   * Determines the space between button group items
   */
  @Prop({ type: String })
  public spacing?: Spacing;

  /**
   * Join buttons as segmented group
   */
  @Prop({ type: Boolean })
  public segmented?: boolean;

  /**
   * Buttons will stretch/shrink to occupy the full width
   */
  @Prop({ type: Boolean })
  public fullWidth?: boolean;

  /**
   * Remove top left and right border radius
   */
  @Prop({ type: Boolean })
  public connectedTop?: boolean;

  get className() {
    return classNames(
      styles.ButtonGroup,
      this.spacing && styles[this.spacing],
      this.segmented && styles.segmented,
      this.fullWidth && styles.fullWidth,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ButtonGroup/ButtonGroup.scss';
</style>
