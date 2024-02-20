<template>
<div style="height: 250px">
  <Popover :active="active" @close="toggleActive">
    <template #activator>
        <Button @click="toggleActive" disclosure>
          Manage staff
        </Button>
    </template>
    <ActionList
      :items="actionItems"
    >
      <template #prefix-chet>
        <Avatar customer size="xs" name="Chet Baker" />
      </template>
      <template #prefix-farrah>
        <Avatar customer size="xs" name="Farrah Fawcett" />
      </template>
    </ActionList>
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const actionItems = [
  {
    content: 'Chet Baker',
    prefixId: 'chet',
  },
  {
    content: 'Farrah Fawcett',
    prefixId: 'farrah',
  },
];

const active = ref<boolean>(false);

const toggleActive = () => {
  active.value = !active.value;
};
</script>
