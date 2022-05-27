<template lang="pug">
div(
  :class="styles.Loading",
  :aria-valuenow="progress",
  :aria-valuemin="0",
  :aria-valuemax="100",
  role="progressbar"
  :aria-label="i18n.translate('Polaris.Loading.label')",
)
  div(
    :class="styles.Level",
    :style="customStyles",
    @transitionend="onTransitionEnd",
  )
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import styles from '@/classes/Frame-Loading.json';
import { UseI18n } from '@/use';

const STUCK_THRESHOLD = 99;

const i18n = UseI18n();

const progress = ref(0);
const animating = ref(false);

const customStyles = computed(() => {
  return {
    transform: `scaleX(${Math.floor(progress.value) / 100})`,
  };
});

onMounted(() => {
  requestAnimation();
});

watch(
  () => [animating.value, progress.value],
  () => {
    requestAnimation();
  },
);

const requestAnimation = () => {
  if (progress.value >= STUCK_THRESHOLD || animating.value) {
    return;
  }

  requestAnimationFrame(() => {
    const step = Math.max((STUCK_THRESHOLD - progress.value) / 10, 1);
    animating.value = true;
    progress.value = progress.value + step;
  });
};

const onTransitionEnd = () => {
  animating.value = false;
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Frame/components/Loading/Loading.scss';
</style>
