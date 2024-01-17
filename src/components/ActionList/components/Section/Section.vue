<template lang="pug">
Box(
  v-if="hasMultipleSections"
  as="li",
  role="presentation",
  borderColor="border-secondary",
  :border-block-start-width="!isFirst ? '025' : undefined",
  :padding-block-stack="!section.title ? '150' : undefined",
)
  SectionMarkUp(v-bind="SectionMarkUpProps")
    template(#title)
      slot(name="title")
template(v-else)
  SectionMarkUp(v-bind="SectionMarkUpProps")
    template(#title)
      slot(name="title")
</template>

<script setup lang="ts">
import { VNode, computed } from 'vue';
import { Box } from '@/components';
import SectionMarkUp from './SectionMarkUp.vue';
import type { ActionListItemDescriptor, ActionListSection, VueNode } from '../../../../utilities/types';

interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Callback when any item is clicked or keypressed */
  onActionAnyItem?: ActionListItemDescriptor['onAction'];
  /** Whether it is the first in a group of sections */
  isFirst?: boolean;
}

const props = defineProps<SectionProps>();

const slots = defineSlots<{
  title?: (_?: VueNode) => VNode[];
}>();

const SectionMarkUpProps = computed(() => {
  return {
    section: props.section,
    hasMultipleSections: props.hasMultipleSections,
    actionRole: props.actionRole,
    onActionAnyItem: props.onActionAnyItem,
    isFirst: props.isFirst,
  }
});
</script>
