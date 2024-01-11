<template>
<LegacyStack spacing="tight">
  <div v-for="option in selectedTags">
    <Card :key="option">
      <Tag @remove="handleRemove(option)" url="#">{{option}}</Tag>
    </Card>
  </div>
</LegacyStack>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedTags = ref([
  'Rustic',
  'Antique',
  'Vinyl',
  'Refurbished',
]);

const handleRemove = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((item) => item !== tag);
};
</script>
