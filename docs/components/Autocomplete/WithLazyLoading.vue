<template>
<LegacyStack vertical>
  <LegacyStack
    v-if="hasSelectedOptions"
    spacing="extraTight"
  >
    <Tag
      v-for="option in selectedOptions"
      :key="`option${option}`"
      @remove="removeTag(option)"
    >
      {{ titleCase(option) }}
    </Tag>
  </LegacyStack>
  <Autocomplete
    allowMultiple
    :options="optionList"
    :selected="selectedOptions"
    listTitle="Suggested Tags"
    :loading="isLoading"
    :willLoadMoreResults="willLoadMoreResults"
    @select="handleSelection"
    @load-more-results="handleLoadMoreResults"
  >
    <template #textField>
      <AutocompleteTextField
        label="Tags"
        v-model="inputValue"
        placeholder="Vintage, cotton, summer"
        autoComplete="off"
        @input="updateText"
      />
    </template>
  </Autocomplete>
</LegacyStack>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const paginationInterval = 25;
const deselectedOptions = Array.from(Array(100)).map((_, index) => ({
  value: `rustic ${index + 1}`,
  label: `Rustic ${index + 1}`,
}));

const selectedOptions = ref<string[]>([]);
const inputValue = ref('');
const options = ref(deselectedOptions);
const isLoading = ref(false);
const willLoadMoreResults = ref(true);
const visibleOptionIndex = ref(paginationInterval);

const optionList = computed(() => {
  return options.value.slice(0, visibleOptionIndex.value);
});

const hasSelectedOptions = computed(() => selectedOptions.value.length > 0);

const handleLoadMoreResults = () => {
  if (willLoadMoreResults) {
    isLoading.value = true;

    setTimeout(() => {
      const remainingOptionCount = options.value.length - visibleOptionIndex.value;
      const nextVisibleOptionIndex =
        remainingOptionCount >= paginationInterval
          ? visibleOptionIndex.value + paginationInterval
          : visibleOptionIndex.value + remainingOptionCount;

      isLoading.value = false;
      visibleOptionIndex.value = nextVisibleOptionIndex;

      if (remainingOptionCount <= paginationInterval) {
        willLoadMoreResults.value = false;
      }
    }, 1000);
  }
};

const removeTag = (tag: string) => () => {
  const options = [...selectedOptions.value];
  options.splice(options.indexOf(tag), 1);

  selectedOptions.value = options;
};

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
  inputValue.value = '';
};

const handleSelection = (selected: string[]) => {
  selectedOptions.value = selected;
  inputValue.value = '';
};

function titleCase(option: string) {
  const string = option.replace(/_/g, ' ');

  return string
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}
</script>
