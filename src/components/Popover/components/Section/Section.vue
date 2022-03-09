<template lang="pug">
div(:class="styles.Section")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/Popover.json';
</script>
