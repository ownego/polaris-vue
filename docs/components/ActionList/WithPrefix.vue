<template>
<div style="height: 250px; maxWidth: 350px">
  <ActionList :items="actionListItem">
    <template #prefix-here>
       <Thumbnail
        source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
        size="small"
        alt="Black leather pet collar"
      />
    </template>
    <template #suffix-here>
      <Icon :source="ChevronRightIcon" />
    </template>
    <template #prefix-there>
      <Avatar customer name="Farrah" size="sm" />
    </template>
    <template #suffix-there>
      <Icon :source="ChevronRightIcon" />
    </template>
  </ActionList>
</div>
</template>

<script setup lang="ts">
import ChevronRightIcon from '@icons/ChevronRightMinor.svg';
const actionListItem = [
  {
    content: "Go here",
    prefixId: "here",
    suffixId: "here",
  },
  {
    content: "Or there",
    prefixId: "there",
    suffixId: "there",
  },
];
</script>
