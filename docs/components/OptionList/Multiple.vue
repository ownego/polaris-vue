<template>
<LegacyCard>
  <OptionList
    title="Manage sales channels availability"
    allow-multiple
    v-model="selected"
    :options="options"
    @change="handleSelect"
  />
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref([]);

const options = [
  {value: 'online_store', label: 'Online Store'},
  {value: 'messenger', label: 'Messenger'},
  {value: 'facebook', label: 'Facebook'},
  {value: 'wholesale', label: 'Wholesale'},
  {value: 'buzzfeed', label: 'BuzzFeed'},
];

const handleSelect = (value) => {
  selected.value = value;
};
</script>
