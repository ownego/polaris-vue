<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Stack.json';

type Spacing =
  | 'extraTight'
  | 'tight'
  | 'baseTight'
  | 'loose'
  | 'extraLoose'
  | 'none';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

type Distribution =
  | 'equalSpacing'
  | 'leading'
  | 'trailing'
  | 'center'
  | 'fill'
  | 'fillEvenly';

@Component
export default class Stack extends Vue {
  /**
   * Wrap stack elements to additional rows as needed on small screens (Defaults to true)
   */
  @Prop({ type: Boolean, default: true })
  public wrap?: boolean;

  /**
   * Stack the elements vertically
   */
  @Prop({ type: Boolean })
  public vertical?: boolean;

  /**
   * Adjust spacing between elements
   */
  @Prop({ type: String })
  public spacing?: Spacing;

  /**
   * Adjust vertical alignment of elements
   */
  @Prop({ type: String })
  public alignment?: Alignment;

  /**
   * Adjust horizontal alignment of elements
   */
  @Prop({ type: String })
  public distribution?: Distribution;

  get className() {
    const spacing = this.spacing && variationName('spacing', this.spacing) as keyof typeof styles;
    const distribution = this.distribution && variationName('distribution', this.distribution) as keyof typeof styles;
    const alignment = this.alignment && variationName('alignment', this.alignment) as keyof typeof styles;

    return classNames(
      styles.Stack,
      this.vertical && styles.vertical,
      spacing && styles[spacing],
      distribution && styles[distribution],
      alignment && styles[alignment],
      this.wrap === false && styles.noWrap,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Stack/Stack.scss';
</style>
