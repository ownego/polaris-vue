<template lang="pug">
Popover(
  :active="isVisible",
  preferInputActivator,
  @close="toggleMenuVisibility",
)
  template(#activator)
    BulkActionButton(
      show-content-in-button,
      :size="size",
      :disclosure="true",
      :content="title",
      :indicator="isNewBadgeInBadgeActions",
      @action="toggleMenuVisibility",
    )
  template(#content)
    ActionList(:items="actions", @action-any-item="toggleMenuVisibility")
</template>

<script setup lang="ts">
import { useToggle } from '@/use/useToggle';
import {
  Popover,
  ActionList,
} from '@/components';
import { BulkActionButton } from '../BulkActionButton';
import type { ActionListItemDescriptor } from '@/utilities/types';
import type { ButtonProps } from '@/components/Button/types';

interface BulkActionsMenuProps {
  actions: ActionListItemDescriptor[];
  title: string;
  isNewBadgeInBadgeActions: boolean;
  size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
}

defineProps<BulkActionsMenuProps>();

const {
  value: isVisible,
  toggle: toggleMenuVisibility,
} = useToggle(false);
</script>
