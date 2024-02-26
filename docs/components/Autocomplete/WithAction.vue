<template>
<div :style="{height: '225px'}">
  <Autocomplete
    :actionBefore="actionBefore"
    :options="options"
    :selected="selectedOptions"
    listTitle="Suggested tags"
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
          <Icon :source="SearchIcon" />
        </template>
      </AutocompleteTextField>
    </template>
  </Autocomplete>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import PlusCircleIcon from '@shopify/polaris-icons/dist/svg/PlusCircleIcon.svg';
// import SearchIcon from '@shopify/polaris-icons/dist/svg/SearchIcon.svg';
import PlusCircleIcon from '@icons/PlusCircleIcon.svg';
import SearchIcon from '@icons/SearchIcon.svg';

const deselectedOptions = [
  {value: 'rustic', label: 'Rustic'},
  {value: 'antique', label: 'Antique'},
  {value: 'vinyl', label: 'Vinyl'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'refurbished', label: 'Refurbished'},
];

const actionBefore = {
  accessibilityLabel: 'Action label',
  badge: {
    tone: 'new',
    content: 'New!',
  },
  content: 'Action with long name',
  ellipsis: true,
  helpText: 'Help text',
  icon: PlusCircleIcon,
  onAction: () => {
    console.log('actionBefore clicked!');
  },
};

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
    const resultOptions = options.value.filter((option) =>
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
};
</script>
