<template>
<div @keydown="handleKeyDown">
  <TextField
    type="text"
    label="State"
    v-model="value"
    :suggestion="suggestion"
    autoComplete="off"
    @input="handleInput"
  />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const suggestion = ref('');

const handleInput = () => {
  const output =
    value.value &&
    suggestions.find((s) =>
    s.toLowerCase().startsWith(value.value.toLowerCase()),
  );

  suggestion.value = output || '';
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === 'Tab') {
    value.value = suggestion.value || value.value;
    suggestion.value = '';
  } else if (event.key === 'Backspace') {
    value.value = value.value;
    suggestion.value = '';
  }
};

const suggestions = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Minor Outlying Islands',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'U.S. Virgin Islands',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];
</script>
