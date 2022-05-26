<template lang="pug">
div(:class="styles.Tabs")
  div(
    v-for="key in count",
    :key="key",
    :class="className(key)",
  )
    SkeletonBodyText(:lines="1")
</template>
<script setup lang="ts">
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/SkeletonTabs.json';
import { SkeletonBodyText } from '@/components';

interface Props {
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 2,
});

const className = (index: number) => {
  return classNames(styles.Tab, index % 2 === 0 ? styles['Tab-short'] : styles['Tab-long']);
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/SkeletonTabs/SkeletonTabs.scss';
</style>
