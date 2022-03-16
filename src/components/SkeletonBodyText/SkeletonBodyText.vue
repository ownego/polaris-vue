<template lang="pug">
AppProvider
  div(
    v-for="index in 5"
    :class="styles.SkeletonBodyText",
  )
</template>

<script setup lang="ts">
import styles from '@/classes/Demo.json'
import {computed} from "vue";
import {AppProvider} from "@/components";

interface Props {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

const props = defineProps<Props>();

const lines = computed(()=> {
  console.log("lines: " + props.lines)
  if (props.lines !== 3) {
    return props.lines;
  }
  return 3;

});
</script>

<style lang="scss">
@import 'polaris-react/src/components/SkeletonBodyText/SkeletonBodyText.scss';
</style>

