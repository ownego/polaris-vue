<template>
<ChoiceList
  title="Company name"
  :choices="choices"
  v-model="selected"
  error="Company name cannot be hidden at this time"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const choices = [
  {label: 'Hidden', value: 'hidden'},
  {label: 'Optional', value: 'optional'},
  {label: 'Required', value: 'required'},
];

const selected = ref(['hidden']);
</script>
