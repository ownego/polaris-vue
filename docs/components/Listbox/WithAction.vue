<template>
<Listbox accessibilityLabel="Listbox with Action example">
  <ListboxOption value="UniqueValue-1">Item 1</ListboxOption>
  <ListboxOption value="UniqueValue-2" divider>
    Item 2
  </ListboxOption>
  <ListboxAction value="ActionValue">
    <LegacyStack spacing="tight">
      <Icon :source="PlusMinor" tone="base" />
      <div>Add item</div>
    </LegacyStack>
  </ListboxAction>
</Listbox>
</template>

<script setup lang="ts">
import PlusMinor from '@icons/PlusMinor.svg';
</script>
