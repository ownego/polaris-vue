<template>
<ChoiceList
  title="Company name"
  :choices="[
    {label: 'Hidden', value: 'hidden'},
    {label: 'Optional', value: 'optional'},
    {label: 'Required', value: 'required'},
  ]"
  v-model="selected"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(['hidden']);
</script>
