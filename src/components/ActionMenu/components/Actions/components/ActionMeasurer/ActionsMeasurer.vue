<template lang="pug">
div(
  ref="containerNode",
  :class="styles.ActionsLayoutMeasurer",
)
  SecondaryAction(
    v-for="action, index in actions",
    v-bind="getSecondaryActionProps(index)",
    :key="action.content",
    @click="action.onAction?.() || undefined",
  ) {{ action.content }}
  SecondaryAction(
    v-for="group in groups",
    :key="group.title",
    :disclosure="true",
    :icon="group.icon",
  ) {{ group.title }}
  SecondaryAction(:disclosure="true") {{ defaultRollupGroup.title }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useI18n from '@/use/useI18n';
import type { MenuActionDescriptor, MenuGroupDescriptor } from '@/utilities/types';
import { useEventListener } from '@/utilities/use-event-listener';
import styles from '@polaris/components/ActionMenu/components/Actions/Actions.module.css';
import type { SecondaryActionProps } from '../../../SecondaryAction/SecondaryAction.vue';
import { SecondaryAction } from '../../../SecondaryAction';

export interface ActionsMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenActionsWidths: number[];
}

export interface ActionsMeasurerProps {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
}

const ACTION_SPACING = 8;

const i18n = useI18n();

const props = defineProps<ActionsMeasurerProps>();

const emits = defineEmits<{
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  'measurements': [value: ActionsMeasurements];
}>();
const containerNode = ref<HTMLDivElement | null>(null);

const defaultRollupGroup = ref<MenuGroupDescriptor>({
  title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
  actions: [],
});

const handleMeasurement = () => {
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

  emits('measurements', {
    containerWidth,
    disclosureWidth,
    hiddenActionsWidths,
  });
};

onMounted(() => {
  handleMeasurement();
});

const getSecondaryActionProps = (index: number) => (
  props.actions?.[index] as SecondaryActionProps
);

useEventListener('resize', handleMeasurement);
</script>
