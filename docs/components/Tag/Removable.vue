<template>
<LegacyStack spacing="tight">
  <div v-for="option in selectedTags">
    <Card :key="option">
      <Tag @remove="handleRemove(option)">{{option}}</Tag>
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
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at ipsum quam. Aliquam fermentum bibendum vestibulum. Vestibulum condimentum luctus metus, sed sagittis magna pellentesque eget. Duis dapibus pretium nisi, et venenatis tortor dignissim ut. Quisque eget lacus ac ex eleifend ultrices. Phasellus facilisis ex sit amet leo elementum condimentum. Ut vel maximus felis. Etiam eget diam eu eros blandit interdum. Sed eu metus sed justo aliquam iaculis ac sit amet ex. Curabitur justo magna, porttitor non pulvinar eu, malesuada at leo. Cras mollis consectetur eros, quis maximus lorem dignissim at. Proin in rhoncus massa. Vivamus lectus nunc, fringilla euismod risus commodo, mattis blandit nulla.',
]);

const handleRemove = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((item) => item !== tag);
};
</script>
