
<template>
<Modal
  sectioned
  :open="active"
  :primary-action="primaryAction"
  :secondary-actions="secondaryActions"
  @close="active = false"
>
  <template #activator>
    <Button
      @click="active = true"
    >
      Open
    </Button>
  </template>

  <template #title>
    Export customers
  </template>

  <FormLayout>
    <ChoiceList
      :choices="firstChoices"
      v-model="firstChoice"
    >
      <template #title>
        Export
      </template>
    </ChoiceList>

    <ChoiceList
      :choices="secondChoices"
      v-model="secondChoice"
    >
      <template #title>
        Export as
      </template>
    </ChoiceList>
  </FormLayout>
</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const CURRENT_PAGE = 'current_page';
const ALL_CUSTOMERS = 'all_customers';
const SELECTED_CUSTOMERS = 'selected_customers';
const CSV_EXCEL = 'csv_excel';
const CSV_PLAIN = 'csv_plain';

const firstChoices = [
  { label: 'Current page', value: CURRENT_PAGE },
  { label: 'All customers', value: ALL_CUSTOMERS },
  { label: 'Selected customers', value: SELECTED_CUSTOMERS },
];

const secondChoices = [
  {
    label: 'CSV for Excel, Numbers, or other spreadsheet programs',
    value: CSV_EXCEL,
  },
  {
    label: 'Plain CSV file',
    value: CSV_PLAIN,
  },
];

const active = ref(false);
const firstChoice = ref(CURRENT_PAGE);
const secondChoice = ref(CSV_EXCEL);

const primaryAction = {
  content: 'Export customers',
  onAction: () => {
    // Do something
  },
};

const secondaryActions = [
  {
    content: 'Cancel',
    onAction: () => {
      // Do something
    },
  },
];
</script>
