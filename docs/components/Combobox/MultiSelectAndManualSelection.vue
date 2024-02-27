<template>
<div :style="{ height: '225px' }">
  <Combobox allowMultiple>
    <template #activator>
      <ComboboxTextField
        label="Search tags"
        label-hidden
        v-model="inputValue"
        placeholder="Search tags"
        autoComplete="off"
        @input="handleInputText"
      >
        <template #prefix>
          <Icon :source="SearchIcon" />
        </template>
      </ComboboxTextField>
    </template>

    <Listbox
      v-if="options.length > 0"
      auto-selection="NONE"
      @select="updateSelection"
    >
      <ListboxOption
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="selectedOptions.includes(option.value)"
        :accessibilityLabel="option.label"
      >
        {{ option.label }}
      </ListboxOption>
    </Listbox>
  </Combobox>
  <TextContainer>
    <LegacyStack>
      <Tag
        v-for="option in selectedOptions"
        :key="`option-${option}`"
        @remove="removeTag(option)"
      >
        {{ option }}
      </Tag>
    </LegacyStack>
  </TextContainer>
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

const handleInputText = (_e: Event, value: string) => {
  updateText(value);
};

const updateText = (value: string) => {
  inputValue.value = value;

  if (value === '') {
    options.value = deselectedOptions;
    return;
  }

  const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
  const resultOptions = deselectedOptions.filter((option) =>
    option.label.match(filterRegex),
  );

  options.value = resultOptions;
};

const updateSelection = (selected: string) => {
  if (selectedOptions.value.includes(selected)) {
    selectedOptions.value = selectedOptions.value.filter((option) => option !== selected);
  } else {
    selectedOptions.value = [...selectedOptions.value, selected];
  }

  updateText('');
}

const removeTag = (tag: string) => {
  const options = [...selectedOptions.value];
  options.splice(options.indexOf(tag), 1);

  selectedOptions.value = options;
};

function escapeSpecialRegExCharacters(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
</script>
