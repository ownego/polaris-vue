<template>
<div style="height: 275px">
  <Popover
    :active="popoverActive"
    @close="togglePopoverActive"
  >
    <template #activator>
      <Button @click="togglePopoverActive" disclosure>
        Options
      </Button>
    </template>
    <OptionList
      title="Inventory Location"
      :options="options"
      :selected="selected"
      @change="handleSelect"
    />
  </Popover>
</div>
<p>{{ selected }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverActive = ref(true);
const selected = ref([]);

const options = [
  {
    value: 'byward_market',
    label: 'Byward Market',
    active: true,
  },
  {value: 'centretown', label: 'Centretown'},
  {
    value: 'hintonburg',
    label: 'Hintonburg',
    active: true,
  },
  {value: 'westboro', label: 'Westboro'},
  {value: 'downtown', label: 'Downtown'},
];

const handleSelect = (value) => {
  selected.value = value;
};

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};
</script>
