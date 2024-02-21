<template>
<div :style="{height: '225px'}">
  <Autocomplete
    :options="options"
    :selected="selectedOptions"
    @select="updateSelection"
  >
    <template #textField>
      <AutocompleteTextField
        label="Tags"
        v-model="inputValue"
        placeholder="Search"
        autoComplete="off"
        @input="updateText"
      >
        <template #prefix>
          <Icon :source="SearchIcon" tone="base" />
        </template>
      </AutocompleteTextField>
    </template>
  </Autocomplete>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import SearchIcon from '@shopify/polaris-icons/dist/svg/SearchIcon.svg';
import SearchIcon from '@icons/SearchIcon.svg';

const deselectedOptions = [
  {value: 'rustic', label: 'Rustic'},
  {value: 'antique', label: 'Antique'},
  {value: 'vinyl', label: 'Vinyl'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'refurbished', label: 'Refurbished'},
];

const selectedOptions = ref<string[]>([]);
const inputValue = ref<string>('');
const options = ref(deselectedOptions);

const updateText = (_e: Event, value: string) => {
  inputValue.value = value;

  if (value === '') {
    options.value = deselectedOptions;
    return;
  }

  const filterRegex = new RegExp(value, 'i');
  const resultOptions = deselectedOptions.filter((option) =>
    option.label.match(filterRegex),
  );

  options.value = resultOptions;
};

const updateSelection = (selected: string[]) => {
  const selectedValue = selected.map((selectedItem) => {
    const matchedOption = options.value.find((option) => {
      return option.value.match(selectedItem);
    });
    return matchedOption && matchedOption.label;
  });

  selectedOptions.value = selected;
  inputValue.value = selectedValue[0] || '';
}
</script>
