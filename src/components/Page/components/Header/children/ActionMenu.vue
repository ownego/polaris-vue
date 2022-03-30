<template lang="pug">
slot(v-if="hasSlot")
ActionMenu(
  v-else-if="!hasSlot && ((secondaryActions && secondaryActions.length > 0) || hasGroupsWithActions(actionGroups))",
  :actions="secondaryActions",
  :groups="actionGroups",
  :rollup="isNavigationCollapsed",
  :rollupActionsLabel="title ? `View actions for ${title}` : undefined",
)
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import { ActionMenu } from '@/components/ActionMenu';
import type { MenuActionDescriptor } from '@/utilities/interface';
import type { ActionMenuProps } from '@/components/ActionMenu/utils';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import { UseMediaQuery } from '@/utilities/media-query';

const props = defineProps<{
  title?: string;
  secondaryActions?: MenuActionDescriptor[];
  actionGroups?: MenuGroupDescriptor[];
}>();

const slots = useSlots();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const hasSlot = computed(() => {
  if (slots.default && slots.default()[0].children) {
    if (typeof slots.default()[0].children === 'string') {
      return slots.default()[0].children !== 'v-if';
    }
    return Array.isArray(slots.default()[0].children) && (slots.default()[0].children as []).length > 0;
  }
  return true;
});

function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}
</script>
