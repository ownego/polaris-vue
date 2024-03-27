<template lang="pug">
div(
  v-if="actions?.length !== 0 || groups?.length !== 0",
  :class="actionMenuClassNames",
)
  RollupActions(
    v-if="rollup",
    :accessibilityLabel="rollupActionsLabel",
    :items="actionListItems",
    :sections="rollupSections",
  )
  Actions(
    v-else,
    :actions="actions",
    :groups="groups",
    @action-rollup="onActionRollUp",
  )
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import type {
  MenuActionDescriptor,
  MenuGroupDescriptor,
  ActionListSection,
  ActionListItemDescriptor,
} from '@/utilities/types';
import { Actions, RollupActions } from './components';
import styles from '@polaris/components/ActionMenu/ActionMenu.module.css';

export interface ActionMenuProps {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  /** Roll up all actions into a Popover > ActionList */
  rollup?: boolean;
  /** Label for rolled up actions activator */
  rollupActionsLabel?: string;
}

const props = defineProps<ActionMenuProps>();

const emits = defineEmits<{
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  (event: 'action-rollup', hasRolledUp: boolean): void;
}>();

const actionMenuClassNames = computed(() =>
  classNames(
    styles.ActionMenu,
    props.rollup && styles.rollup,
  ),
);

const rollupSections = computed(() =>
  props.groups?.map((group) => convertGroupToSection(group)),
);

const actionListItems = computed(() => props.actions as ActionListItemDescriptor[]);

const convertGroupToSection = ({
  title,
  actions,
  disabled,
}: MenuGroupDescriptor) => {
  return {
    title,
    items: actions.map((action) => ({
      ...action,
      disabled: disabled || action.disabled,
    })),
  } as ActionListSection;
}

const onActionRollUp = (hasRolledUp: boolean) => {
  emits('action-rollup', hasRolledUp);
};
</script>
