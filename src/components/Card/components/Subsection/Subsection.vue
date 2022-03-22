<template lang="pug">
div(:class="styles.Subsection")
  slot
</template>
<script setup lang="ts">
import styles from '@/classes/Card.json';
</script>
