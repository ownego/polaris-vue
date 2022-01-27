<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/TextContainer.json';
import { classNames, variationName } from 'polaris-react/src/utilities/css';

type Spacing = 'tight' | 'loose';

@Component
export default class TextContainer extends Vue {
  /**
   * The amount of vertical spacing children will get between them
   */
  @Prop({ type: String })
  public spacing?: Spacing;

  get className(): string {
    const spacingVariation = this.spacing
      && styles[variationName('spacing', this.spacing) as keyof typeof styles];

    return classNames(
      styles.TextContainer,
      spacingVariation,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextContainer/TextContainer.scss';
</style>
