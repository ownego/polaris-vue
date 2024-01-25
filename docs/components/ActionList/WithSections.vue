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
      :sections="sections"
    />
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeleteMinor from '@icons/DeleteMinor.svg';
import EditMinor from '@icons/EditMinor.svg';
import ExportMinor from '@icons/ExportMinor.svg';
import ImportMinor from '@icons/ImportMinor.svg';

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
};

const sections = [
  {
    title: 'File options',
    items: [
      { content: 'Import file', icon: ImportMinor },
      { content: 'Export file', icon: ExportMinor },
    ],
  },
  {
    title: 'Bulk actions',
    items: [
      { content: 'Edit', icon: EditMinor },
      { content: 'Delete', icon: DeleteMinor },
    ],
  },
];
</script>
