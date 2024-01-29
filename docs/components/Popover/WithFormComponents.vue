<template>
<div style="height: 250px">
  <Popover
    sectioned
    :active="popoverActive"
    autofocusTarget="first-node"
    @close="togglePopoverActive"
  >
    <template #activator>
      <Button @click="togglePopoverActive" disclosure>Filter</Button>
    </template>
    <FormLayout>
      <Select label="Show all customers where:" :options="selectOptions"></Select>
      <TextField
        label="Tags"
        v-model="inputVal"
        autoComplete="off"
      ></TextField>
      <Button size="slim">Add filter</Button>
    </FormLayout> 
  </Popover>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popoverActive = ref(false);

const selectOptions = ['Tagged with'];

const inputVal = ref('');

const togglePopoverActive = () => {
  popoverActive.value = !popoverActive.value;
};
</script>


