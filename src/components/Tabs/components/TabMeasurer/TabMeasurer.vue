<template lang="pug">
div(:class="classname", ref="containerNode")
  Tab(
    v-for="tab, index in tabs",
    :measuring="true",
    :key="`${tab.id}Hidden`",
    :id="`${tab.id}`",
    :siblingTabHasFocus="siblingTabHasFocus",
    :focused="index === tabToFocus",
    :selected="index === selected",
    :url="tab.url",
    :content="tab.content",
  )
  slot
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { VueNode } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import { useEventListener } from '@/utilities/use-event-listener';
import styles from '@polaris/components/Tabs/Tabs.module.scss';
import type { TabMeasurements, TabProps } from '../../types';
import { Tab } from '../index';

export interface TabMeasurerProps {
  tabToFocus: number;
  siblingTabHasFocus: boolean;
  selected: number;
  tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[];
}

const props = defineProps<TabMeasurerProps>();

const slots = defineSlots<{
  /** activator elements to display inside the tag*/
  default: (_?: VueNode) => any;
}>();

const emits = defineEmits<{
  'measurement': [measurements: TabMeasurements];
}>();

const containerNode = ref<HTMLDivElement | null>(null);
const animationFrame = ref<number | null>(null);

const classname = computed(() => classNames(styles.Tabs, styles.TabsMeasurer));

const handleMeasurement = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  animationFrame.value = requestAnimationFrame(() => {
    if (!containerNode.value) {
      return;
    }

    const containerWidth = containerNode.value.offsetWidth - 20 - 28;
    const hiddenTabNodes = containerNode.value.children;
    const hiddenTabNodesArray = Array.from(hiddenTabNodes);
    const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
      const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
      return buttonWidth + 4;
    });
    const disclosureWidth = hiddenTabWidths.pop() || 0;

    emits('measurement', {
      containerWidth,
      disclosureWidth,
      hiddenTabWidths,
    });
  });
};

onMounted(() => {
  handleMeasurement();
});

useEventListener('resize', handleMeasurement);
</script>
