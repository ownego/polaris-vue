<template lang="pug">
component(:is="element", :class="className")
  slot
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/TextStyle.json';

type Variation = 'positive' | 'negative' | 'warning' | 'strong' | 'subdued' | 'code';

const VariationValue = {
  positive: 'positive',
  negative: 'negative',
  warning: 'warning',
  strong: 'strong',
  subdued: 'subdued',
  code: 'code',
}

function variationElement(variation?: Variation) {
  return variation === VariationValue.code ? 'code' : 'span';
}

const props = defineProps({
  /**
   * Give text additional visual meaning
   * @values positive | negative | strong | subdued | code
   */
  variation: {
    type: String as () => Variation,
    default: null,
  },
});

const element = ref(variationElement(props.variation));

const className = computed(() => {
  const variation = props.variation && (variationName('variation', props.variation) as keyof typeof styles);

  return classNames(variation && styles[variation]);
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TextStyle/TextStyle.scss';
</style>
