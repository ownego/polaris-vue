<template lang="pug">
div(
  @blur="() => focused = false",
  @focus="() => focused = true",
  :class="className",
)
  slot
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Filters-ConnectedFilterControl.json';

const focused = ref(false);

const className = computed(() => classNames(
  styles.Item,
  focused.value && styles['Item-focused'],
));
</script>
