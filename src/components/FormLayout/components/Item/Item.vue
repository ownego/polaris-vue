<template lang="pug">
div(v-if="$slots.default", :class="styles.Item")
  slot
</template>

<script setup lang="ts">
import styles from '@/classes/FormLayout.json';
</script>
