<template>
<TextField
  label="Tags"
  v-model="textFieldValue"
  placeholder="Search tags"
  autoComplete="off"
>
  <template #verticalContent>
    <LegacyStack spacing="extraTight" alignment="center">
      <Tag v-for="tag in tags" :key="tag">{{ tag }}</Tag>
    </LegacyStack>
  </template>
</TextField>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
const textFieldValue = ref('');
</script>
