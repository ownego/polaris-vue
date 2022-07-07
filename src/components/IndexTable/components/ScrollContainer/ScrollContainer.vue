<template lang="pug">
div(
  :class="styles.ScrollContainer",
  ref="scrollableContainerRef",
  @scroll="handleScroll",
)
  slot
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import type { Ref } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import type {
  ScrollContextType,
} from '@/utilities/index-table';
import styles from '@/classes/IndexTable-ScrollContainer.json';

const scrollableContainerRef = ref<HTMLDivElement | null>(null);

const emits = defineEmits<{
  (e: 'scroll', canScrollLeft: boolean, canScrollRight: boolean): void;
}>();

onMounted(() => {
  if (scrollableContainerRef.value) {
    scrollableContainerRef.value.dispatchEvent(new Event('scroll'));
  }
});

const containerScroll = ref<ScrollContextType>({
  scrollableContainer: scrollableContainerRef,
  canScrollLeft: false,
  canScrollRight: false,
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
      scrollableContainer: scrollableContainerRef as any,
      canScrollLeft,
      canScrollRight,
    };
  },
  40,
  {trailing: true, leading: true, maxWait: 40},
);

provide<Ref<ScrollContextType>>('ScrollContext', containerScroll as any);

defineExpose({ scrollableContainerRef });
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/IndexTable/components/ScrollContainer/ScrollContainer.scss';
</style>
