<template>
<div style="height: 250px">
  <Popover
    :active="popoverActive"
    autofocusTarget="first-node"
    @close="togglePopoverActive"
  >
    <template #activator>
      <Button @click="togglePopoverActive" disclosure>Sales channels</Button>
    </template>
    <Pane>
      <PopoverSection>
        <p>Available sales channels</p>
      </PopoverSection>
    </Pane>
    <Pane>
      <ActionList
        actionRole="menuitem"
        :items="actionListItem"
      ></ActionList>
    </Pane>
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverActive = ref(false);

const actionListItem = [
  {content: 'Online store'},
  {content: 'Facebook'},
  {content: 'Shopify POS'},
]

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};
</script>

