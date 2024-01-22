<template lang="pug">
BlockStack(
  role="group",
  gap="200",
  :aria-labelled="titleId",
  :aria-describedby="helpTextId",
)
  Text(
    v-if="title",
    :id="titleId",
    as="p",
  ) {{ title }}
  InlineStack(gap="300")
    Item(
      v-for="item, index in slotsElms",
      :key="index",
      :condensed="condensed",
    )
      component(:is="item")

  Box(
    v-if="hasHelpText",
    :id="helpTextId",
    color="text-secondary",
  )
    slot(v-if="slots.helpText", name="helpText")
    template(v-else) {{ helpText }}
</template>

<script lang="ts">
export default {
  name: 'FormLayoutGroup',
}
</script>
<script setup lang="ts">
import { computed, type VNode } from 'vue';
import type { VueNode } from '@/utilities/types';
import useId from '@/use/useId';
import { useHasSlot } from '@/use/useHasSlot';
import { useExtractFragment } from '@/use/useExtractFragment';
import {
  Box,
  BlockStack,
  InlineStack,
  Text,
} from '@/components';
import { Item } from '../Item';

type GroupProps = {
  condensed?: boolean;
  title?: string;
  helpText?: string;
}

type GroupSlots = {
  default: (_?: VueNode) => VNode[];
  helpText?: (_?: VueNode) => VNode[];
}

const props = defineProps<GroupProps>();
const slots = defineSlots<GroupSlots>();

const id = useId();
const { hasSlot } = useHasSlot();
const { slotsElms } = useExtractFragment(slots.default);

const hasHelpText = computed(() => hasSlot(slots.helpText) || props.helpText);

const titleId = computed(() => props.title && `${id}Title`);
const helpTextId = computed(() => hasHelpText.value && `${id}HelpText`);
</script>
