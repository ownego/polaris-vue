<template>
<LegacyCard sectioned>
  <FormLayout>
    <LegacyStack :wrap="false" alignment="leading" spacing="loose">
      <LegacyStackItem fill>
        <FormLayout>
          <FormLayoutGroup condensed>
            <Select
              label-hidden
              label="Collection rule type"
              :options="['Product type']"
              v-model="selectTypeValue"
            />
            <Select
              label-hidden
              label="Collection rule condition"
              :options="['is equal to']"
              v-model="selectConditionValue"
            />
            <TextField
              label-hidden
              label="Collection rule content"
              :error="isInvalid"
              :id="textFieldID"
              v-model="textFieldValue"
              autoComplete="off"
            />
          </FormLayoutGroup>
        </FormLayout>
        <div :style="{marginTop: '4px'}">
          <InlineError :message="errorMessage" :field-id="textFieldID" />
        </div>
      </LegacyStackItem>
      <Button :icon="DeleteMinor" accessibilityLabel="Remove item" />
    </LegacyStack>
  </FormLayout>
</LegacyCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import DeleteMinor from '@icons/DeleteMinor.svg';

const textFieldValue = ref('');
const selectTypeValue = ref('Product type');
const selectConditionValue = ref('is equal to');

const textFieldID = 'ruleContent';

const isInvalid = computed(() => {
  return textFieldValue.value ? textFieldValue.value.length < 3 : true;
});

const errorMessage = computed(() => isInvalid.value
  ? 'Enter 3 or more characters for product type is equal to'
  : ''
);
</script>

