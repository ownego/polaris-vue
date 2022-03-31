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
  )
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
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

const actionMenuClassNames = computed(() => {
  return classNames(
    styles.ActionMenu,
    // props.rollup && styles.rollup,
  );
});

const rollupSections = computed(() => {
  return (props.groups || []).map((group) => convertGroupToSection(group));
});

function convertGroupToSection({
  title,
  actions,
}: MenuGroupDescriptor): ActionListSection {
  return { title, items: actions };
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ActionMenu/ActionMenu.scss';
</style>
