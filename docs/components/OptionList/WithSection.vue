<template>
<LegacyCard>
  <OptionList
    allowMultiple
    :sections="sections"
    :selected="selected"
    @change="handleSelect"
  />
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sections = [
  {
    options: [
      {value: 'type', label: 'Sale item type'},
      {value: 'kind', label: 'Sale kind'},
    ],
  },
  {
    title: 'Traffic',
    options: [
      {value: 'source', label: 'Traffic referrer source'},
      {value: 'host', label: 'Traffic referrer host'},
      {value: 'path', label: 'Traffic referrer path'},
    ],
  },
];

const selected = ref<string[]>([]);

const handleSelect = (value: string[]) => {
  selected.value = value;
}
</script>
