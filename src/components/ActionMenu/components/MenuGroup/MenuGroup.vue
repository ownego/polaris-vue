<template lang="pug">
Popover(
  v-if="actions.length",
  :active="Boolean(active)",
  preferred-alignment="left",
  hideOnPrint,
  @close="handleClose",
)
  template(#activator)
    SecondaryAction(
      :disclosure="true",
      :icon="icon",
      :accessibilityLabel="accessibilityLabel",
      @click="handleOpen",
      @get-offset-width="handleOffsetWidth",
    ) {{ title }}
  template(#content)
    ActionList(
      :items="actions",
      @action-any-item="handleClose",
    )
    div(
      v-if="slots.default",
      :class="styles.Details",
    )
      slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { useSlots, watch } from 'vue';
import styles from '@/classes/ActionMenu-MenuGroup.json';
import { ActionList, Popover } from '@/components';
import { SecondaryAction } from '../SecondaryAction';
import type { ActionListItemDescriptor } from '@/components/ActionList/utils';
import type { IconableAction } from '@/utilities/type';

interface MenuGroupProps {
  badge?: {
    status: 'new';
    content: string;
  };
  /** Menu group title */
  title: string;
  /** List of actions */
  actions: ActionListItemDescriptor[];
  /** Icon to display */
  icon?: IconableAction['icon'];
  /** Zero-indexed numerical position. Overrides the group's order in the menu. */
  index?: number;
  /** Visually hidden menu description for screen readers */
  accessibilityLabel?: string;
  /** Whether or not the menu is open */
  active?: boolean;
}

const props = defineProps<MenuGroupProps>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'open', title: string): void;
  (e: 'close', title: string): void;
  (e: 'get-offset-width', width: number): void;
}>();

const handleClose = () => {
  emits('close', props.title);
};

const handleOpen = () => {
  emits('open', props.title);
};

const handleOffsetWidth = (width: number) => {
  emits('get-offset-width', width);
};
</script>

<style lang="scss">
@import 'polaris-react/src/components/ActionMenu/components/MenuGroup/MenuGroup.scss';
</style>
