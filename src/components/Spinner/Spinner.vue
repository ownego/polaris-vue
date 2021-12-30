<template lang="pug">
div
  span(:class="className")
    SpinnerIconLarge(v-if="size === 'large'")
    SpinnerIconSmall(v-else)
  span(v-bind="spanAttributes")
    VisuallyHidden
      span {{ accessibilityLabel }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from '@/classes/Spinner.json';
import SpinnerIconLarge from '@/assets/spinner-large.svg';
import SpinnerIconSmall from '@/assets/spinner-small.svg';

type Size = 'small' | 'large';

@Component({
  components: {
    VisuallyHidden,
    SpinnerIconLarge,
    SpinnerIconSmall,
  },
})
export default class Spinner extends Vue {
  /**
   * Size of Spinner
   * @values small | large
   */
  @Prop({ type: String, default: 'large' })
  public size!: Size;

  /**
   * Accessible label for the spinner
   */
  @Prop({ type: String })
  public accessibilityLabel!: string;

  /**
   * Allows the component to apply the correct accessibility roles based on focus
   */
  @Prop({ type: Boolean })
  public hasFocusableParent!: boolean;

  get className() {
    const variation = variationName('size', this.size) as keyof typeof styles;

    return classNames(
      styles.Spinner,
      this.size && styles[variation],
    );
  }

  public spanAttributes = {
    ...(!this.hasFocusableParent && { role: 'status' }),
  };
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Spinner/Spinner.scss';
</style>
