<template lang="pug">
span(:class="className")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Indicator.json';

interface IndicatorProps {
  pulse?: boolean;
}

const props = withDefaults(defineProps<IndicatorProps>(), {
  pulse: false,
});

const className = computed(() => {
  return classNames(
    styles.Indicator,
    props.pulse && styles.pulseIndicator,
  );
});
</script>
<style lang="scss">
@import 'polaris-react/src/components/Indicator/Indicator.scss';
</style>
