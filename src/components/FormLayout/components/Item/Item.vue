<template lang="pug">
div(:class="styles.Item")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/FormLayout.json';
</script>
