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
import DeleteIcon from '@icons/DeleteIcon.svg';
import EditIcon from '@icons/EditIcon.svg';
import ExportIcon from '@icons/ExportIcon.svg';
import ImportIcon from '@icons/ImportIcon.svg';

const active = ref(true);

const toggleActive = () => {
  active.value = !active.value;
};

const sections = [
  {
    title: 'File options',
    items: [
      { content: 'Import file', icon: ImportIcon },
      { content: 'Export file', icon: ExportIcon },
    ],
  },
  {
    title: 'Bulk actions',
    items: [
      { content: 'Edit', icon: EditIcon },
      { content: 'Delete', icon: DeleteIcon },
    ],
  },
];
</script>
