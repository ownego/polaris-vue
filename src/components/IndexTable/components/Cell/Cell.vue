<template lang="pug">
td(:class="cellClassName")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@/classes/IndexTable.json';

interface Props {
  flush?: boolean;
}

const props = defineProps<Props>();

const cellClassName = computed(() => classNames(
  styles.TableCell,
  props.flush && styles['TableCell-flush'],
));
</script>

