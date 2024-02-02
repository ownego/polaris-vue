<template lang="pug">
Box(
  v-if="hasMultipleSections"
  as="li",
  role="presentation",
  borderColor="border-secondary",
  :border-block-start-width="!isFirst ? '025' : undefined",
  :padding-block-stack="!section.title ? '150' : undefined",
)
  SectionMarkUp(
    v-bind="SectionMarkUpProps",
    @action-any-item="emits('action-any-item')",
  )
template(v-else)
  SectionMarkUp(
    v-bind="SectionMarkUpProps",
    @action-any-item="emits('action-any-item')",
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Box } from '@/components';
import SectionMarkUp from './SectionMarkUp.vue';
import type { ActionListSection } from '../../../../utilities/types';

interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Whether it is the first in a group of sections */
  isFirst?: boolean;
}

const props = defineProps<SectionProps>();
const emits = defineEmits<{
  /** Callback when any item is clicked or keypressed */
  'action-any-item': [];
}>();

const SectionMarkUpProps = computed(() => {
  return {
    section: props.section,
    hasMultipleSections: props.hasMultipleSections,
    actionRole: props.actionRole,
    isFirst: props.isFirst,
  }
});
</script>
