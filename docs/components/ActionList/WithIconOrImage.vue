<template>
<div style="height: 250px">
  <Popover
    :active="active"
    autofocusTarget="first-node"
    @close="toggleActive"
  >
    <template #activator>
      <Button @click="toggleActive" disclosure>
        More actions
      </Button>
    </template>
    <ActionList
      actionRole="menuitem"
      :items="actionItems"
    />
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DuplicateIcon from '@icons/DuplicateMinor.svg';
import ArchiveIcon from '@icons/ArchiveMinor.svg';

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
};

const actionItems = [
  {
    content: 'Duplicate',
    icon: DuplicateIcon,
  },
  {
    content: 'Archive',
    icon: ArchiveIcon,
  },
];
</script>

