<template lang="pug">
div(:class="styles.Section")
  Box(
    padding-inline-start="300",
    padding-inline-end="300",
    padding-block-start="200",
    padding-block-end="150",
  )
    slot
</template>

<script setup lang="ts">
import { Box } from '@/components';
import styles from '@polaris/components/Popover/Popover.module.css';
</script>


