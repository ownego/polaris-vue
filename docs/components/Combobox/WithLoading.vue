<template>
<div :style="{ height: '225px' }">
  <Combobox>
    <template #activator>
      <ComboboxTextField
        label="Search tags"
        label-hidden
        v-model="inputValue"
        placeholder="Search tags"
        autoComplete="off"
        @input="updateText"
      >
        <template #prefix>
          <Icon :source="SearchIcon" />
        </template>
      </ComboboxTextField>
    </template>

    <Listbox
      v-if="options.length > 0"
      @select="updateSelection"
    >
      <ListboxOption
        v-if="!loading"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="selectedOption === option.value"
        :accessibilityLabel="option.label"
      >
        {{ option.label }}
      </ListboxOption>
      <ListboxLoading v-else accessibilityLabel="Loading" />
    </Listbox>
  </Combobox>
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

const selectedOption = ref<string>();
const inputValue = ref<string>('');
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
      return;
    }

    const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
    const resultOptions = deselectedOptions.filter((option) =>
      option.label.match(filterRegex),
    );

    options.value = resultOptions;
    loading.value = false;
  }, 300);
};

const updateSelection = (selected: string) => {
  const matchedOption = options.value.find((option) => {
    return option.value.match(selected);
  });

  selectedOption.value = selected;
  inputValue.value = matchedOption ? matchedOption.label : '';
};

function escapeSpecialRegExCharacters(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
</script>
