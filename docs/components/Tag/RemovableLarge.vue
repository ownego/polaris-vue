<template>
<BlockStack gap="100">
  <Card>
    <Text as="p">Large</Text>
    <LegacyStack spacing="tight">
      <Tag
        v-for="option in selectedTags"
        :key="option"
        size="large"
        @remove="removeTag(option)"
      >{{ option }}</Tag>
    </LegacyStack>
  </Card>

  <Card>
    <Text as="p">Large with link</Text>
    <LegacyStack spacing="tight">
      <Tag
        v-for="option in selectedTags"
        :key="option"
        size="large"
        url="#"
        @remove="removeTag(option)"
      >{{ option }}</Tag>
    </LegacyStack>
  </Card>
</BlockStack>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedTags = ref([
  'Rustic',
  'Antique',
  'Vinyl',
  'Refurbished',
]);

const removeTag = (tag: string) => () => {
  selectedTags.value = selectedTags.value.filter((selectedTag) => selectedTag !== tag);
};
</script>
