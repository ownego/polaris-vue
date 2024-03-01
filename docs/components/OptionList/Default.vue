<template>
<LegacyCard>
  <OptionList
    title="Inventory Location"
    :options="options"
    :selected="selected"
    @change="handleSelect"
  />
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  {value: 'byward_market', label: 'Byward Market'},
  {value: 'centretown', label: 'Centretown'},
  {value: 'hintonburg', label: 'Hintonburg'},
  {value: 'westboro', label: 'Westboro'},
  {value: 'downtown', label: 'Downtown'},
];

const selected = ref([]);

const handleSelect = (value: any) => {
  selected.value = value;
};
</script>
