<template>
<LegacyCard>
  <Tabs :tabs="tabs" :selected="selected" @select="handleTabChange">
    <LegacyCardSection :title="tabs[selected].content">
      <Spinner
        v-if="loading"
        accessibility-label="Loading form field"
        :has-focusable-parent="false"
      />
      <Form v-else no-validate @submit="handleSubmit">
        <FormLayout>
          <TextField
            auto-complete="off"
            :value="value"
            :focused="textFieldFocused"
            :label="label"
            @change="handleUrlChange"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </LegacyCardSection>
  </Tabs>
</LegacyCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

 const tabs = [
  {
    id: 'all-customers',
    content: 'All',
    accessibilityLabel: 'All customers',
    panelID: 'all-customers-content',
  },
  {
    id: 'accepts-marketing',
    content: 'Accepts marketing',
    panelID: 'accepts-marketing-content',
  },
];

const selected = ref<number>(0);
const loading = ref<boolean>(false);
const value = ref<string>('');
const textFieldFocused = ref<boolean>(false);

const label = computed(() => selected.value ? 'Marketings' : 'Customers');

const handleTabChange = (selectedTab: number) => {
  loading.value = true;
  selected.value = selectedTab;

  setTimeout(() => {
    value.value = '';
    loading.value = false;
  }, 2000);
};

const handleUrlChange = (url: string) => {
  value.value = url;
};

const handleSubmit = () => {
  value.value = '';
};3

watch(
  () => loading.value,
  () => {
    textFieldFocused.value = !loading.value;
  }
)
</script>
