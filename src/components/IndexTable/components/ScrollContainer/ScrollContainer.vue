<template lang="pug">
div(
  ref="scrollableContainerRef",
  :class="styles.ScrollContainer",
  @scroll="handleScroll",
)
  slot
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { scrollDefaultContext, type ScrollContextType } from '../../context';

import styles from '@polaris/components/IndexTable/components/ScrollContainer/ScrollContainer.module.css';

export type ScrollContainerEvents = {
  'scroll': [canScrollLeft: boolean, canScrollRight: boolean];
}

const emits = defineEmits<ScrollContainerEvents>();

const scrollableContainerRef = ref<HTMLDivElement | null>(null);
const containerScroll = ref<ScrollContextType>(scrollDefaultContext);

onMounted(() => {
  if (scrollableContainerRef.value) {
    scrollableContainerRef.value.dispatchEvent(new Event('scroll'));
  }
});

const handleScroll = debounce(
  () => {
    if (!scrollableContainerRef.value) {
      return;
    }

    const availableScrollAmount =
      scrollableContainerRef.value.scrollWidth -
      scrollableContainerRef.value.offsetWidth;

    const canScrollLeft = scrollableContainerRef.value.scrollLeft > 0;
    const canScrollRight =
      scrollableContainerRef.value.scrollLeft < availableScrollAmount;

    emits('scroll', canScrollLeft, canScrollRight);

    containerScroll.value = {
      scrollableContainer: scrollableContainerRef.value,
      canScrollLeft,
      canScrollRight,
    };
  },
  40,
  {trailing: true, leading: true, maxWait: 40},
);

provide('scrollContext', containerScroll);

defineExpose({ scrollableContainerRef });
</script>
