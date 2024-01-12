<template lang="pug">
span(:class="className")
  Text(
    visually-hidden,
    as="span",
  ) {{ accessibilityLabel }}
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { Text } from '@/components';
import { getDefaultAccessibilityLabel } from '../../utils';
import type { Tone, Progress } from '../../types';

interface PipProps {
  tone?: Tone;
  progress?: Progress;
  accessibilityLabelOverride?: string;
}

const styles = useCssModule();

const props = withDefaults(defineProps<PipProps>(), {
  progress: 'complete'
});

const className = computed(() => classNames(
    styles.Pip,
    props.tone && styles[variationName('tone', props.tone)],
    props.progress && styles[variationName('progress', props.progress)],
  )
);

const accessibilityLabel = computed(() => {
  return props.accessibilityLabelOverride
    ? props.accessibilityLabelOverride
    : getDefaultAccessibilityLabel(props.progress, props.tone);
})
</script>

<style lang="scss" module>
@import '@polaris/components/Badge/components/Pip/Pip.scss';
</style>
