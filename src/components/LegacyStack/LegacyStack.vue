<template lang="pug">
div(:class="className")
  slot(v-if="noItemWrap")
  template(
    v-else-if="slotsElms.length",
    v-for="item, _index in slotsElms",
    :key="_index",
  )
    component(v-if="isChildContentWrappedByItem && hasContent(item)", :is="item")
    LegacyStackItem(v-else-if="hasContent(item)")
      component(:is="item")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHasSlot } from '@/use/useHasSlot';
import { useExtractFragment } from '@/use/useExtractFragment';
import { classNames, variationName } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import LegacyStackItem from './components/Item/Item.vue';
import { isElementOfType } from '@/utilities/component';
import styles from '@polaris/components/LegacyStack/LegacyStack.module.scss';

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
  /** No wrap all stack elements with StackItem  */
  noItemWrap?: boolean;
}

const slots = defineSlots<{
  /** Elements to display inside stack */
  default: (_?: VueNode) => any;
}>()

const { hasContent } = useHasSlot();
const { slotsElms } = useExtractFragment(slots.default);

const props = withDefaults(defineProps<LegacyStackProps>(), {
  wrap: true,
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

const isChildContentWrappedByItem = computed(() => {
  const childContents: any = slots.default?.() || [];

  if (!childContents.length) {
    return false;
  }

  const children = childContents[0].children && childContents[0].children.length
    ? childContents[0].children[0]
    : childContents[0];

  return isElementOfType(children, LegacyStackItem);
});
</script>
