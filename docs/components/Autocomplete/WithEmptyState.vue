<template>
<div :style="{height: '225px'}">
  <Autocomplete
    :options="options"
    :selected="selectedOptions"
    :loading="loading"
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

    <template #emptyState>
      <Icon :source="SearchIcon" />
      <div :style="{textAlign: 'center'}">
        <TextContainer>Could not find any results</TextContainer>
      </div>
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
const inputValue = ref('');
const options = ref(deselectedOptions);
const loading = ref(false);

const updateText = (_e: Event, value: string) => {
  inputValue.value = value;

  if (!loading.value) {
    loading.value = true;
  }

  setTimeout(() => {
    if (value === '') {
      options.value = deselectedOptions;
      loading.value = false;
      return;
    }
    const filterRegex = new RegExp(value, 'i');
    const resultOptions = deselectedOptions.filter((option) =>
      option.label.match(filterRegex),
    );

    options.value = resultOptions;
    loading.value = false;
  }, 300);
};

const updateSelection = (selected: string[]) => {
  const selectedText = selected.map((selectedItem) => {
    const matchedOption = options.value.find((option) => {
      return option.value.match(selectedItem);
    });
    return matchedOption && matchedOption.label;
  });

  selectedOptions.value = selected;
  inputValue.value = selectedText[0] || '';
}
</script>
