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

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
};

const sections = [
  {
    items: [
      {
        content: 'Blog posts',
        helpText: 'Manage your blog articles',
      },
      {
        content: 'Blogs',
        helpText: 'Manage blogs published to your Online Store',
      },
    ],
  },
];
</script>
