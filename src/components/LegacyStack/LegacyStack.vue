<template lang="pug">
div(
  :class="className",
)
  template(
    v-if="hasSlot(slots.default) && slotsElms.length && slotsElms[0]?.children",
    v-for="item in slotsElms[0]?.children",
  )
    LegacyStackItem
      component(:is="item")
  template(
    v-else-if="hasSlot(slots.default) && slotsElms.length > 1",
    v-for="item in slotsElms",
  )
    LegacyStackItem
      component(:is="item")
  slot(v-else)
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { VNodeArrayChildren } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { extractElement } from '@/utilities/extract-fragment';
import { hasSlot } from '@/utilities/has-slot';
import LegacyStackItem from './components/Item/Item.vue';

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

export interface LegacyStackProps {
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
}

const styles = useCssModule();
const slots = defineSlots<{
  /** Elements to display inside stack */
  default: (_: VueNode) => any;
}>()

const props = withDefaults(defineProps<LegacyStackProps>(), {
  wrap: true,
});

const slotsElms = computed(() => {
  let elms : VNodeArrayChildren = [];
  if (slots.default) {
    const groups = slots.default().map(group => {
      return extractElement(group);
    });
    elms = groups.flat();
  }

  return elms;
});

const className = computed(() => {
  return classNames(
    styles.LegacyStack,
    props.vertical && styles.vertical,
    props.spacing && styles[variationName('spacing', props.spacing)],
    props.distribution && styles[variationName('distribution', props.distribution)],
    props.alignment && styles[variationName('alignment', props.alignment)],
    props.wrap === false && styles.noWrap,
    );
  }
);
</script>

<style lang="scss" module>
@import '@polaris/components/LegacyStack/LegacyStack.scss';
</style>
