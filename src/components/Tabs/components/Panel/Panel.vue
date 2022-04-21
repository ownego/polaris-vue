<template lang="pug">
div(
  :class="className",
  :id="id",
  role="tabpanel",
  :aria-labelledby="tabID",
  tabIndex="-1",
)
  slot
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Tabs.json';

interface PanelProps {
  hidden?: boolean;
  id: string;
  tabID: string;
}

const props = defineProps<PanelProps>();

const className = computed(() => {
  return classNames(
    styles.Panel,
    props.hidden && styles['Panel--hidden'],
  );
});
</script>
