<template lang="pug">
div(
  v-if="(actions && actions.length) || (groups && groups.length)",
  :class="actionMenuClassNames",
)
  RollupActions(
    v-if="rollup",
    :accessibilityLabel="rollupActionsLabel",
    :items="actions",
    :sections="rollupSections",
  )
  Actions(
    v-else,
    :actions="actions",
    :groups="groups",
    @action-rollup="onActionRollUp",
  )
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/ActionMenu.json';
import type { ActionListSection } from '@/components/ActionList/utils';
import type { MenuActionDescriptor } from '@/utilities/interface';
import { Actions, RollupActions } from './components';
import type { MenuGroupDescriptor } from './components/MenuGroup/utils';

interface ActionMenuProps {
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

const actionMenuClassNames = computed(() => {
  return classNames(
    styles.ActionMenu,
    // props.rollup && styles.rollup,
  );
});

const rollupSections = computed(() => {
  return (props.groups || []).map((group) => convertGroupToSection(group));
});

const onActionRollUp = (hasRolledUp: boolean) => {
  emits('action-rollup', hasRolledUp);
};

function convertGroupToSection({
  title,
  actions,
  disabled,
}: MenuGroupDescriptor): ActionListSection {
  return {
    title,
    items: actions.map((action) => ({
      ...action,
      disabled: disabled || action.disabled,
    })),
  };
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ActionMenu/ActionMenu.scss';
</style>
