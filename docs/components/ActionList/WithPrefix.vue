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
import { h } from 'vue';
import { Icon } from '@/components';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';

const prefixHere = h(Icon, { source: ChevronRightIcon });
// const prefixThere = h(Avatar, { customer: true, name: "Farrah", size: "sm" });
const suffixThere = h(Icon, { source: ChevronRightIcon });

const actionListItem = [
  {
    content: "Go here",
    prefix: prefixHere,
  },
  {
    content: "Or there",
    // prefix: prefixThere,
    suffix: suffixThere,
  },
];
</script>
