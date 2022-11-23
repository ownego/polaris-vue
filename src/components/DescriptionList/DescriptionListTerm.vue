<template lang="pug">
dt(:class="styles.Term")
  Text(as="span", variant="headingSm")
    slot
</template>

<script setup lang="ts">
import { Text } from '@/components';
import styles from '@/classes/DescriptionList.json';
</script>
