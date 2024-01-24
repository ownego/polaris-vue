<template>
<Listbox accessibilityLabel="Listbox with custom element example">
  <ListboxAction value="ActionValue" divider>
    Add item
  </ListboxAction>
  <ListboxOption value="UniqueValue-1">
    <div>Item 1</div>
  </ListboxOption>
  <ListboxOption value="UniqueValue-2">
    <div>Item 2</div>
  </ListboxOption>
  <ListboxOption value="UniqueValue-3">
    <div>Item 3</div>
  </ListboxOption>
  <ListboxLoading accessibilityLabel="items are loading" />
</Listbox>
</template>
