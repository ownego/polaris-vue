<template>
<LegacyCard>
  <OptionList
    title="Manage sales channels availability"
    allow-multiple
    :selected="selected"
    :options="options"
    @change="handleSelect"
  />
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref<string[]>([]);

const options = [
  {value: 'online_store', label: 'Online Store'},
  {value: 'messenger', label: 'Messenger'},
  {value: 'facebook', label: 'Facebook'},
  {value: 'wholesale', label: 'Wholesale'},
  {value: 'buzzfeed', label: 'BuzzFeed'},
];

const handleSelect = (value: string[]) => {
  selected.value = value;
};
</script>
