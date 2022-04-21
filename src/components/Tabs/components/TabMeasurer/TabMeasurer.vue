<template lang="pug">
div(
  :class="className",
  ref="containerNode",
)
  EventListener(event="resize", :handler="handleMeasurement")
  Tab(
    v-for="tab, index in tabs",
    measuring,
    :key="`${index}${tab.id}Hidden`",
    :id="`${tab.id}Measurer`",
    :siblingTabHasFocus="siblingTabHasFocus",
    :focused="index === tabToFocus",
    :selected="index === selected",
    :url="tab.url",
  )
    slot(v-if="hasSlot(slots[tab.id])", :name="tab.id")
    template(v-else) {{ tab.content }}
  slot(name="activator")
</template>
<script setup lang="ts">
import { ref, useSlots, watch } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/Tabs.json';
import { EventListener } from '@/components';
import { hasSlot } from '@/utilities/has-slot';
import { Tab } from '../Tab';
import type { TabDescriptor, TabMeasurements } from '../../types';

interface TabMeasurerProps {
  tabToFocus: number;
  siblingTabHasFocus: boolean;
  selected: number;
  tabs: TabDescriptor[];
}

const props = defineProps<TabMeasurerProps>();
const emits = defineEmits<{
  (e: 'measurement', measurements: TabMeasurements): void;
}>();
const slots = useSlots();

const containerNode = ref<HTMLDivElement | null>(null);
const animationFrame = ref<number | null>(null);

const handleMeasurement = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  animationFrame.value = requestAnimationFrame(() => {
    if (!containerNode.value) {
      return;
    }

    const containerWidth = containerNode.value.offsetWidth;
    const hiddenTabNodes = containerNode.value.children;
    const hiddenTabNodesArray = Array.from(hiddenTabNodes);
    const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
      return Math.ceil(node.getBoundingClientRect().width);
    });
    const disclosureWidth = hiddenTabWidths.pop() || 0;

    emits('measurement', {
      containerWidth,
      disclosureWidth,
      hiddenTabWidths,
    });
  });
}

watch(
  () => props.tabs,
  () => {
    handleMeasurement();
  },
);

const className = classNames(styles.Tabs, styles.TabMeasurer);
</script>

