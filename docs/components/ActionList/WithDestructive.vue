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
      {
        active: true,
        content: 'Import file',
        icon: ImportMinor,
      },
      { content: 'Export file', icon: ExportMinor },
      {
        destructive: true,
        content: 'Delete file',
        icon: DeleteMinor,
      },
    ],
  },
];
</script>
