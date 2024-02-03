<template>
<div style="height: 250px; maxWidth: 350px">
  <ActionList :items="actionListItem">
  </ActionList>
</div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon, Avatar } from '@/components';
import ChevronRightIcon from '@icons/ChevronRightIcon.svg';

const prefixHere = h(Icon, { source: ChevronRightIcon });
const prefixThere = h(Avatar, { customer: true, name: "Farrah", size: "sm" });
const suffix = h(Icon, { source: ChevronRightIcon });

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
