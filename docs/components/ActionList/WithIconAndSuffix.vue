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
import { h, ref } from 'vue';
import { Icon } from '@/components';
import ImportIcon from '@icons/ImportIcon.svg';
import ExportIcon from '@icons/ExportIcon.svg';
import CheckSmallIcon from '@icons/CheckSmallIcon.svg';

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
};

const suffixImport = h(Icon, { source: CheckSmallIcon });

const actionItems = [
  {
    active: true,
    content: 'Import file',
    icon: ImportIcon,
    suffix: suffixImport,
  },
  {
    content: 'Export file',
    icon: ExportIcon,
  },
];
</script>
