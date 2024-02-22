<template>
<div :style="{height: '325px'}">
  <Autocomplete
    allowMultiple
    :options="options"
    :selected="selectedOptions"
    @select="updateSelection"
    listTitle="Suggested Tags"
  >
    <template #textField>
      <AutocompleteTextField
        label="Tags"
        v-model="inputValue"
        placeholder="Vintage, cotton, summer"
        autoComplete="off"
        @input="updateText"
      >
        <template v-if="selectedOptions.length" #verticalContent>
          <LegacyStack spacing="extraTight" alignment="center">
            <Tag v-for="option in selectedOptions" :key="option" @remove="removeTag(option)">
              {{ titleCase(option.replace('_', ' ')) }}
            </Tag>
          </LegacyStack>
        </template>
      </AutocompleteTextField>
    </template>
  </Autocomplete>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const deselectedOptions = [
  {value: 'rustic', label: 'Rustic'},
  {value: 'antique', label: 'Antique'},
  {value: 'vinyl', label: 'Vinyl'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'refurbished', label: 'Refurbished'},
];

const selectedOptions = ref<string[]>(['rustic']);
const inputValue = ref('');
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
  selectedOptions.value = selected;
};

const removeTag = (tag: string) => {
  const options = [...selectedOptions.value];
  options.splice(options.indexOf(tag), 1);
  selectedOptions.value = options;
};

const titleCase = (string: string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join('');
};
</script>
