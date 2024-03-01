<template lang="pug">
div(:class="styles.BulkActionsMeasurerLayout" ref="containerNode")
  template(v-for="action, _index in promotedActions", :key="_index")
    BulkActionButton(
      v-if="instanceOfMenuGroupDescriptor(action)",
      disclosure,
      show-content-in-button,
      :size="buttonSize",
      :content="action.title",
    )
    BulkActionButton(
      v-else,
      :disabled="disabled",
      :size="buttonSize",
      v-bind="action",
    )
  BulkActionButton(
    disclosure,
    :content="activatorLabel",
  )
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useI18n from '@/use/useI18n';
import { useEventListener } from '@/utilities/use-event-listener';
import { BulkActionButton } from '../BulkActionButton';
import type { BulkActionsProps } from '../../types';
import { instanceOfMenuGroupDescriptor } from '../../utils';

import styles from '@polaris/components/BulkActions/BulkActions.module.scss';

export type ActionsMeasurements = {
  containerWidth: number;
  disclosureWidth: number;
  hiddenActionsWidths: number[];
}

export type ActionsMeasurerProps = {
  /** Collection of page-level action groups */
  promotedActions?: BulkActionsProps['promotedActions'];
  disabled?: BulkActionsProps['disabled'];
  buttonSize?: BulkActionsProps['buttonSize'];
  handleMeasurement(measurements: ActionsMeasurements): void;
}

const ACTION_SPACING = 4;

const props = withDefaults(defineProps<ActionsMeasurerProps>(), {
  promotedActions: () => [],
});

const i18n = useI18n();
const containerNode = ref<HTMLDivElement | null>(null);

const activatorLabel = i18n.translate(
  'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
);

useEventListener('resize', handleMeasurement);

onMounted(() => {
  handleMeasurement();
});

function handleMeasurement() {
  if (!containerNode.value) {
    return;
  }

  const containerWidth = containerNode.value.offsetWidth;
  const hiddenActionNodes = containerNode.value.children;
  const hiddenActionNodesArray = Array.from(hiddenActionNodes);
  const hiddenActionsWidths = hiddenActionNodesArray.map((node) => {
    const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
    return buttonWidth + ACTION_SPACING;
  });
  const disclosureWidth = hiddenActionsWidths.pop() || 0;

  props.handleMeasurement({
    containerWidth,
    disclosureWidth,
    hiddenActionsWidths,
  });
};
</script>
