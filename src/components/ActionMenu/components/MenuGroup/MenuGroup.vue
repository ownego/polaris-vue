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
      @click="handleClick",
      @get-offset-width="handleOffsetWidth",
    ) {{ title }}
  ActionList(
    :items="actions",
    :sections="sections",
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
import { useSlots } from 'vue';
import type {
  IconableAction,
  ActionListItemDescriptor,
  ActionListSection,
} from '@/utilities/types';
import styles from '@polaris/components/ActionMenu/components/MenuGroup/MenuGroup.module.scss';
import { SecondaryAction } from '../SecondaryAction';

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
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
}

const props = defineProps<MenuGroupProps>();
console.log('M group => ', props);

const slots = useSlots();

const emits = defineEmits<{
  (e: 'click'): void;
  (e: 'open', title: string): void;
  (e: 'close', title: string): void;
  (e: 'get-offset-width', width: number): void;
}>();

const handleClose = () => {
  emits('close', props.title);
};

const handleClick = () => {
  emits('click');
  emits('open', props.title);
};

const handleOffsetWidth = (width: number) => {
  emits('get-offset-width', width);
};
</script>
