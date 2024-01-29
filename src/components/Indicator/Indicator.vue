<template lang="pug">
span(:class="className")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/Indicator/Indicator.module.css';

export interface IndicatorProps {
  pulse?: boolean;
}

const props = withDefaults(defineProps<IndicatorProps>(), {
  pulse: false,
});

const className = computed(() => classNames(
  styles.Indicator,
  props.pulse && styles.pulseIndicator,
));
</script>
