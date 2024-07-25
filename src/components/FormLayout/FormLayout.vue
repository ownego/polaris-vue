<template lang="pug">
BlockStack(gap="400")
  template(
    v-if="!noItemWrap",
    v-for="child, index in slotsElms",
    :key="index",
  )
    Item(
      v-if="!isGroup(child)",
    )
      component(:is="child", :ref="(el: any) => { itemRefs[index] = el }")

    component(v-else, :is="child", :ref="(el: any) => { itemRefs[index] = el }")

  slot(v-else)
</template>

<script setup lang="ts">
import { ref, type VNode } from 'vue';
import { BlockStack } from '@/components';
import type { VueNode } from '@/utilities/types';
import { useExtractFragment } from '@/use/useExtractFragment';

// @ts-ignore Note: use as `component :is` on template
import { Group, Item } from './components';

type FormLayoutProps = {
  /** Unwrap all stack elements  */
  noItemWrap?: boolean;
}

type FormLayoutSlots = {
  /** The content to display inside the layout. */
  default: (_?: VueNode) => VNode[];
}

defineProps<FormLayoutProps>();
const slots = defineSlots<FormLayoutSlots>();

const { slotsElms } = useExtractFragment(slots.default);

const itemRefs = ref<any[]>([]);

const isGroup = (child: VNode) => {
  return typeof child.type !== 'string'
    && (
      (child.type as Record<string, any>).name === 'FormLayoutGroup'
      || (child.type as Record<string, any>).__name === 'FormLayoutGroup'
    );
};
</script>
