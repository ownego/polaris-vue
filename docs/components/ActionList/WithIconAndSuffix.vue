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
    >
      <template #suffix-import>
        <Icon :source="TickSmallMinor" />
      </template>
    </ActionList>
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImportMinor from '@icons/ImportMinor.svg';
import ExportMinor from '@icons/ExportMinor.svg';
import TickSmallMinor from '@icons/TickSmallMinor.svg';

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
};

const actionItems = [
  {
    active: true,
    content: 'Import file',
    icon: ImportMinor,
    suffixId: "import",
  },
  {
    content: 'Export file',
    icon: ExportMinor,
  },
];
</script>
