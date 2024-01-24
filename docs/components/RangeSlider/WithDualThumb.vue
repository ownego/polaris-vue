<template>
<LegacyCard sectioned title="Minimum requirements">
  <div>
    <RangeSlider
      output
      label="Money spent is between"
      v-model="rangeValue"
      :prefix="prefix"
      :min="min"
      :max="max"
      :step="step"
    />
    <LegacyStack distribution="equalSpacing" spacing="extraLoose">
      <TextField
        label="Min money spent"
        type="number"
        v-model="lowerTextFieldValue"
        :prefix="prefix"
        :min="min"
        :max="max"
        :step="step"
        autoComplete="off"
        @change="handleLowerTextFieldChange"
      />
      <TextField
        label="Max money spent"
        type="number"
        v-model="upperTextFieldValue"
        :prefix="prefix"
        :min="min"
        :max="max"
        :step="step"
        autoComplete="off"
        @change="handleUpperTextFieldChange"
      />
    </LegacyStack>
  </div>
</LegacyCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const prefix = '$';
const min = 0;
const max = 2000;
const step = 10;

const rangeValue = ref([900, 1000]);

const lowerTextFieldValue = computed({
  get: () => `${rangeValue.value[0]}`,
  set: () => {},
});
const upperTextFieldValue = computed({
  get: () => `${rangeValue.value[1]}`,
  set: () => {},
});

const handleLowerTextFieldChange = (value: string) => {
  rangeValue.value = [Number(value), rangeValue.value[1]];

  if (rangeValue.value[0] > rangeValue.value[1]) {
    rangeValue.value = [rangeValue.value[1], rangeValue.value[1]];
  }
};

const handleUpperTextFieldChange = (value: string) => {
  rangeValue.value = [rangeValue.value[0], Number(value)];

  if (rangeValue.value[0] > rangeValue.value[1]) {
    rangeValue.value = [rangeValue.value[0], rangeValue.value[0]];
  }
};
</script>
