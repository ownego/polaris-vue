<template lang="pug">
div(:class="styles.AdditionalNavigationWrapper")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/Page-Header.json';
</script>
