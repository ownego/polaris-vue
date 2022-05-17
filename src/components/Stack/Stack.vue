<template lang="pug">
div(:class="className")
  template(v-if="!noItemWrap && slots.default && hasSlot(slots.default)")
    StackItem(
      v-for="(item, index) in slots.default()",
      :key="index"
    )
      component(:is="item")
  slot(v-else)
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Stack.json';
import { hasSlot } from '@/utilities/has-slot';
import { Item as StackItem } from './components';

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

interface Props {
  /** Wrap stack elements to additional rows as needed on small screens (Defaults to true) */
  wrap?: boolean;
  /** Stack the elements vertically */
  vertical?: boolean;
  /** Adjust spacing between elements */
  spacing?: Spacing;
  /** Adjust vertical alignment of elements */
  alignment?: Alignment;
  /** Adjust horizontal alignment of elements */
  distribution?: Distribution;
  /** No wrap all stack elements with StackItem  */
  noItemWrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  wrap: true,
  noItemWrap: false,
});

const slots = useSlots();

const className = computed(() => {
  const spacing = props.spacing && variationName('spacing', props.spacing) as keyof typeof styles;
  const distribution = props.distribution && variationName('distribution', props.distribution) as keyof typeof styles;
  const alignment = props.alignment && variationName('alignment', props.alignment) as keyof typeof styles;

  return classNames(
    styles.Stack,
    props.vertical && styles.vertical,
    spacing && styles[spacing],
    distribution && styles[distribution],
    alignment && styles[alignment],
    props.wrap === false && styles.noWrap,
  );
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Stack/Stack.scss';
</style>
