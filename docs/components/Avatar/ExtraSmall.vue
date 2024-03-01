<template>
<div :style="{ height: '150px' }">
  <Popover :active="active" @close="toggleActive">
    <template #activator>
        <Button @click="toggleActive" disclosure>
          Manage staff
        </Button>
    </template>
    <ActionList :items="actionItems" />
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue';

const actionItems = [
  {
    customer: true,
    content: 'Chet Baker',
    prefix: h(resolveComponent('Avatar'), { customer: true, size: 'xs', name: 'Chet Baker' }),
  },
  {
    customer: true,
    content: 'Farrah Fawcett',
    prefix: h(resolveComponent('Avatar'), { customer: true, size: 'xs', name: 'Chet Baker' }),
  },
];

const active = ref<boolean>(true);

const toggleActive = () => {
  active.value = !active.value;
};
</script>
