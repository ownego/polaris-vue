<template lang="pug">
div(:class="className")
  slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Stack.json';

interface Props {
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
}

const props = withDefaults(defineProps<Props>(), { fill: false });

const className = computed(() => classNames(styles.Item, props.fill && styles['Item-fill']));
</script>
