<template>
<div style="height: 250px; maxWidth: 350px">
  <ActionList :items="actionListItem">
  </ActionList>
</div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';

const prefixHere = h(resolveComponent('Thumbnail'), {
  source:"https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
  size: "small",
  alt: "Black leather choker necklace",
});
const prefixThere = h(resolveComponent('Avatar'), { customer: true, name: "Farrah", size: "sm" });
const suffix = h(resolveComponent('Icon'), { source: ChevronRightIcon });

const actionListItem = [
  {
    content: "Go here",
    prefix: prefixHere,
    suffix
  },
  {
    content: "Or there",
    prefix: prefixThere,
    suffix,
  },
];
</script>
