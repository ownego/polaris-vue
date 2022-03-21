<template lang="pug">
Collapsible(
  :id="id || uid",
  :open="expanded",
  :transition="{ duration: '0ms', timingFunction: 'linear' }",
)
  ul(:class="styles.List")
    slot
</template>

<script setup lang="ts">
import { Collapsible } from '@/components';
import styles from '@/classes/Navigation.json';
import { UseUniqueId } from '@/use';

interface SecondaryProps {
  expanded: boolean;
  id?: string;
}

defineProps<SecondaryProps>();

const { useUniqueId } = UseUniqueId();
const uid = useUniqueId('SecondaryNavigation');
</script>
