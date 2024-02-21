<template>
<div :style="{height: '225px'}">
  <Autocomplete
    :selected="selectedOptions"
    :options="options"
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
// import SearchIcon from '@shopify/polaris-icons/dist/svg/SearchIcon.svg';
import SearchIcon from '@icons/SearchIcon.svg';

type Section = {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
};

const deselectedOptions: Section[] = [
  {
    title: 'Frequently used',
    options: [
      {value: 'ups', label: 'UPS'},
      {value: 'usps', label: 'USPS'},
    ],
  },
  {
    title: 'All carriers',
    options: [
      {value: 'dhl', label: 'DHL Express'},
      {value: 'canada_post', label: 'Canada Post'},
    ],
  },
];

const selectedOptions = ref<string[]>([]);
const inputValue = ref('');
const options = ref(deselectedOptions);

const updateText = (_e: Event, value: string) => {
  inputValue.value = value;

  if (value === '') {
    options.value = deselectedOptions;
    return;
  }

  const filterRegex = new RegExp(value, 'i');
  const resultOptions: Section[] = [];

  deselectedOptions.forEach((opt) => {
    const options = opt.options.filter((option) =>
      option.label.match(filterRegex),
    );

    resultOptions.push({
      title: opt.title,
      options,
    });
  });

  options.value = resultOptions;
};

const updateSelection = (selected: string[]) => {
  let selectedValue: string | undefined;

  options.value.forEach(({options}) => {
    if (selectedValue) {
      return;
    }

    const matchedOption = options.find((option) =>
      option.value.match(selected[0]),
    );

    if (matchedOption) {
      selectedValue = matchedOption.label;
    }
  });

  selectedOptions.value = selected;
  inputValue.value = selectedValue ? selectedValue : '';
};
</script>
