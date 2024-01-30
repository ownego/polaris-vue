<template>
<Listbox accessibilityLabel="Listbox with Action example">
  <ListboxOption value="UniqueValue-1">Item 1</ListboxOption>
  <ListboxOption value="UniqueValue-2" divider>
    Item 2
  </ListboxOption>
  <ListboxAction value="ActionValue">
    <LegacyStack spacing="tight">
      <Icon :source="PlusCircleIcon" tone="base" />
      <div>Add item</div>
    </LegacyStack>
  </ListboxAction>
</Listbox>
</template>

<script setup lang="ts">
import PlusCircleIcon from '@icons/PlusCircleIcon.svg';
</script>
