<template lang="pug">
li(
  :class="styles.Item"
)
  slot
</template>

<script setup lang="ts">
import styles from '@polaris/components/List/List.module.scss';
</script>
