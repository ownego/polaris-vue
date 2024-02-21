<template lang="pug">
slot(v-if="hasSlot(slots.default)")
ActionMenu(
  v-else-if="hasActionMenu",
  :actions="secondaryActions",
  :groups="actionGroups",
  :rollup="isNavigationCollapsed",
  :rollupActionsLabel="rollupActionsLabel",
  @action-rollup="onActionRollup",
)
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { ActionMenu } from '@/components/ActionMenu';
import type { ActionMenuProps } from '@/components/ActionMenu/ActionMenu.vue';
import type { MenuGroupDescriptor, MenuActionDescriptor } from '@/utilities/types';
import { useMediaQueryContext } from '@/use/useMediaQuery';
import { useHasSlot } from '@/use/useHasSlot';
import useI18n from '@/use/useI18n';

const props = defineProps<{
  title?: string;
  secondaryActions?: MenuActionDescriptor[];
  actionGroups?: MenuGroupDescriptor[];
}>();

const emits = defineEmits<{
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  (e: 'action-rollup', hasRolledUp: boolean): void;
}>();

const slots = useSlots();
const { hasSlot } = useHasSlot();
const { isNavigationCollapsed } = useMediaQueryContext();
const i18n = useI18n();

const rollupActionsLabel = computed(() => 
  props.title ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', { title: props.title }) : undefined,
);

const hasActionMenu = computed(() =>
  (props.secondaryActions && props.secondaryActions.length > 0)
    || hasGroupsWithActions(props.actionGroups),
);

const onActionRollup = (hasRolledUp: boolean) => {
  emits('action-rollup', hasRolledUp);
};

function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}
</script>
