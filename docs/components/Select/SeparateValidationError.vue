<template>
<LegacyCard sectioned>
  <LegacyStack vertical spacing="extraTight">
    <FormLayout>
      <FormLayoutGroup condensed>
        <TextField
          label="Product weight"
          type="number"
          v-model="weight"
          :error="Boolean(!weight && unit)"
          autoComplete="off"
        />
        <Select
          id="unitSelectID"
          label="Unit of measure"
          placeholder="Select"
          :options="['oz', 'g', 'kg', 'lb']"
          v-model="unit"
          :error="Boolean(!unit && weight)"
        />
      </FormLayoutGroup>
    </FormLayout>
    <InlineError :message="errorMessage" :field-id="unitSelectID" />
  </LegacyStack>
</LegacyCard>
</template>

<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';

const weight = ref('12');
const unit = ref('');

const unitSelectID = 'unit';

/**
 * Render a custom error message
 */
const errorMessage = () => {
  const weightError =
      !weight.value && unit.value ? 'The numeric weight of the product ' : '';

  const unitError =
    !unit.value && weight.value ? 'The unit of measure for the product weight' : '';

  if (!weightError && !unitError) {
    return '';
  }

  return h('span', [
    h(resolveComponent('Text'), { tone: 'critical', as: 'span' }, () => [
      h('p', [
        `${weightError}${unitError} is required when weight based shipping rates are enabled. `,
        h(resolveComponent('Link'), () => 'Manage shipping'),
      ]),
    ]),
  ]);
}
</script>
