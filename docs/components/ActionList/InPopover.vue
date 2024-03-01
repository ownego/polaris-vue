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

const active = ref(true);

const toggleActive = () => {
  active.value = !active.value;
};

const handleImportedAction = () => console.log('Imported action');

const handleExportedAction = () => console.log('Exported action');

const actionItems = [
  {
    content: 'Import file',
    onAction: handleImportedAction,
  },
  {
    content: 'Export file',
    onAction: handleExportedAction,
  },
];
</script>
