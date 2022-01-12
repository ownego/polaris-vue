<template lang="pug">
component(:is="element", :class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/TextStyle.json';

type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

// eslint-disable-next-line no-shadow
enum VariationValue {
  Positive = 'positive',
  Negative = 'negative',
  Strong = 'strong',
  Subdued = 'subdued',
  Code = 'code',
}

function variationElement(variation?: Variation) {
  return variation === VariationValue.Code ? 'code' : 'span';
}

@Component
export default class TextStyle extends Vue {
  /**
   * Give text additional visual meaning
   * @values positive | negative | strong | subdued | code
   */
  @Prop({ type: String })
  public variation!: Variation;

  get className() {
    const variation = this.variation && variationName('variation', this.variation) as keyof typeof styles;

    return classNames(
      variation && styles[variation],
    );
  }

  public element = variationElement(this.variation);
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/TextStyle/TextStyle.scss';
</style>
