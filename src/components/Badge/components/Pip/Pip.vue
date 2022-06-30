<template lang="pug">
span(:class="className")
  VisuallyHidden
    template(v-if="accessibilityLabelOverride") {{ accessibilityLabelOverride }}
    template(v-else) {{ getDefaultAccessibilityLabel(progress, status) }}
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { VisuallyHidden } from '@/components';
import type { Progress, Status } from '../../utils';
import { getDefaultAccessibilityLabel } from '../../utils';
import styles from '@/classes/Badge-Pip.json';

interface PipProps {
  status?: Status;
  progress?: Progress;
  accessibilityLabelOverride?: string;
}

const props = withDefaults(defineProps<PipProps>(), {
  progress: 'complete',
});

const className = computed(() => {
  return classNames(
    styles.Pip,
    props.status && styles[variationName('status', props.status)],
    props.progress && styles[variationName('progress', props.progress)],
  );
});
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Badge/components/Pip/Pip.scss';
</style>
