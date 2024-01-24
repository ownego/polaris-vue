<template>
<div style="height: 250px">
  <Popover
    :active="popoverActive"
    autofocusTarget="first-node"
    @close="togglePopoverActive"
  >
    <template #activator>
      <Button @click="togglePopoverActive" disclosure>More actions</Button>
    </template>
    <!-- <ActionList
      actionRole="menuitem"
      :items="actionListItem"
    ></ActionList> -->
    <p> Haild test</p>
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverActive = ref(false);

const actionListItem = [{content: 'Import'}, {content: 'Export'}];

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};
</script>
