<template lang="pug">
Popover(
  :active="isVisible",
  preferInputActivator,
  @close="toggleMenuVisibility",
)
  template(#activator)
    BulkActionButton(
      :disclosure="true",
      :content="title",
      :indicator="isNewBadgeInBadgeActions",
      @action="toggleMenuVisibility",
    )
  template(#content)
    ActionList(:items="actions", @action-any-item="toggleMenuVisibility")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Popover, ActionList } from '@/components';
import { BulkActionButton } from '../BulkActionButton';
import type { ActionListItemDescriptor } from '@/components/ActionList/utils';

interface BulkActionsMenuProps {
  actions: ActionListItemDescriptor[];
  title: string;
  isNewBadgeInBadgeActions: boolean;
}

const props = defineProps<BulkActionsMenuProps>();

const isVisible = ref(false);

const toggleMenuVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

