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
      >
        <template #verticalContent>
          <LegacyStack
            v-if="selectedTags.length > 0"
            spacing="extraTight"
            alignment="center"
          >
            <Tag
              v-for="tag in selectedTags"
              :key="`option-${tag}`"
              @remove="removeTag(tag)"
            >
              {{ tag }}
            </Tag>
          </LegacyStack>
        </template>
      </ComboboxTextField>
    </template>

    <Listbox
      v-if="noResults"
      auto-selection="NONE"
      @select="updateSelection"
      @active-option-change="handleActiveOptionChange"
    >
      <ListboxAction v-if="noResults" :value="inputValue">{{ `Add "${inputValue}"` }}</ListboxAction>
      <ListboxOption
        v-if="options.length > 0"
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="selectedTags.includes(option)"
        :accessibilityLabel="option"
      >
        <ListboxTextOption :selected="selectedTags.includes(option)">
          <component :is="formatOptionText(option)" />
        </ListboxTextOption>
      </ListboxOption>
    </Listbox>
  </Combobox>
</div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue';
// @ts-ignore
import { Text } from '@/components';
// import { Text } from '@ownego/polaris-vue';

const selectedTags = ref<string[]>(['Rustic']);
const inputValue = ref('');
const suggestion = ref('');

const allTags = computed(() => {
  const savedTags = ['Rustic', 'Antique', 'Vinyl', 'Vintage', 'Refurbished'];
  return [...new Set([...savedTags, ...selectedTags.value].sort())];
});

const noResults = computed(() => {
  return inputValue.value && !allTags.value.includes(inputValue.value);
});

const options = computed(() => {
  let list;
  const filterRegex = new RegExp(inputValue.value, 'i');

  if (inputValue.value) {
    list = allTags.value.filter((tag) => tag.match(filterRegex));
  } else {
    list = allTags.value;
  }

  return [...list];
});

const formatOptionText = (option: string) => {
  const trimValue = inputValue.value.trim().toLocaleLowerCase();
  const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

  if (!inputValue.value || matchIndex === -1) return option;

  const start = option.slice(0, matchIndex);
  const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
  const end = option.slice(matchIndex + trimValue.length, option.length);

  return h('p', [
    start,
    h(Text, { fontWeight: 'bold', as: 'span' }, {
      default: () => highlight,
    }),
    end,
  ]);
};

const handleActiveOptionChange = (activeOption: string) => {
  const activeOptionIsAction = activeOption === inputValue.value;

  if (!activeOptionIsAction && !selectedTags.value.includes(activeOption)) {
    suggestion.value = activeOption;
  } else {
    suggestion.value = '';
  }
};

const updateSelection = (selected: string) => {
  console.log(selected);
  const nextSelectedTags = new Set([...selectedTags.value]);

  if (nextSelectedTags.has(selected)) {
    nextSelectedTags.delete(selected);
  } else {
    nextSelectedTags.add(selected);
  }

  selectedTags.value = [...nextSelectedTags];
  inputValue.value = '';
  suggestion.value = '';
};

const removeTag = (tag: string) => {
  updateSelection(tag);
};
</script>
