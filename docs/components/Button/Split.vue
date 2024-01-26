<template>
<div style="height: 100px">
  <InlineStack gap="500">
    <ButtonGroup variant="segmented">
      <Button variant="primary">Save</Button>

      <Popover
        :active="active === 'popover1'"
        preferred-alignment="right"
        autofocusTarget="first-node"
        @close="toggleActive('popover1')"
      >
        <template #activator>
          <Button
            variant="primary"
            :icon="ChevronDownIcon"
            accessibility-label="Other save actions"
            @click="toggleActive('popover1')"
          ></Button>
        </template>
        <ActionList
          actionRole="menuitem"
          :items="[{ content: 'Save as draft' }]"
        >
        </ActionList>
      </Popover>
    </ButtonGroup>

    <ButtonGroup variant="segmented">
      <Button>Save</Button>

      <Popover
        :active="active === 'popover2'"
        preferred-alignment="right"
        autofocusTarget="first-node"
        @close="toggleActive('popover2')"
      >
        <template #activator>
          <Button
            :icon="ChevronDownIcon"
            accessibility-label="Other save actions"
            @click="toggleActive('popover2')"
          ></Button>
        </template>
        <ActionList
          actionRole="menuitem"
          :items="[{ content: 'Save as draft' }]"
        ></ActionList>
      </Popover>
    </ButtonGroup>
  </InlineStack>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';

const active = ref<string | null>(null);

const toggleActive = (id: string) => {
  active.value = active.value !== id ? id : null;
};
</script>
