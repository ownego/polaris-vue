<template lang="pug">
div(
  :class="styles.BulkActions",
  :style="{ width: width ? `${width}px` : undefined }",
)
  InlineStack(gap="400", blockAlign="center")
    div(:class="styles.BulkActionsSelectAllWrapper")
      CheckableButton(
        v-bind="checkableButtonProps",
        ref="checkableButtonRef",
        @toggle-all="emits('toggle-all')",
      )
      //- paginatedSelectAllMarkup

    div(:class="styles.BulkActionsPromotedActionsWrapper")
      InlineStack(gap="100", blockAlign="center")
        div(:class="styles.BulkActionsOuterLayout")
          //- measurerMarkup
          div(:class="bulkActionLayoutClassName")
            //- promotedActionsMarkup

        //- actionsMarkup
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import type { MenuGroupDescriptor } from '@/utilities/types';
import {
  ActionList,
  Popover,
  InlineStack,
  CheckableButton,
  UnstyledButton,
  CheckableButtonProps,
} from '@/components';
import {
  BulkActionButton,
  BulkActionMenu,
  BulkActionMeasurer,
  type ActionsMeasurements,
} from './components';
import type {
  BulkActionsProps,
  BulkActionsEvents,
  BulkAction,
  BulkActionListSection,
  AriaLive,
} from './types';
import {
  getVisibleAndHiddenActionsIndices,
  isNewBadgeInBadgeActions,
  instanceOfMenuGroupDescriptor,
  instanceOfBulkActionListSection,
  getActionSections,
} from './utils';
import styles from '@polaris/components/BulkActions/BulkActions.module.scss';

const i18n = useI18n();

const props = defineProps<BulkActionsProps>();
const emits = defineEmits<BulkActionsEvents>();

const popoverActive = ref<boolean>(false);
const disclosureWidth = ref<number>(0);
const containerWidth = ref<number>(Infinity);
const actionsWidths = ref<number[]>([]);
const visiblePromotedActions = ref<number[]>([]);
const hiddenPromotedActions = ref<number[]>([]);
const hasMeasured = ref<boolean>(false);
const checkableButtonRef = ref<InstanceType<typeof CheckableButton> | null>(null);

const setPromotedActions = () => {
  if (
    containerWidth.value === 0 ||
    !props.promotedActions ||
    props.promotedActions.length === 0
  ) {
    return;
  }
  const {
    visiblePromotedActions: tmpVisiblePromotedActions,
    hiddenPromotedActions: tmpHiddenPromotedActions,
  } =
    getVisibleAndHiddenActionsIndices(
      props.promotedActions,
      disclosureWidth.value,
      actionsWidths.value,
      containerWidth.value,
    );

  visiblePromotedActions.value = tmpVisiblePromotedActions;
  hiddenPromotedActions.value = tmpHiddenPromotedActions;
  hasMeasured.value = containerWidth.value !== Infinity;
};

const activatorLabel = computed(() => (
  !props.promotedActions || (props.promotedActions && visiblePromotedActions.value.length === 0)
    ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
    : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel')
));

const hasTextAndAction = computed(() => props.paginatedSelectAllText && props.paginatedSelectAllAction);

const ariaLive = computed(() => hasTextAndAction.value ? 'polite' : undefined);

const checkableButtonProps = computed<CheckableButtonProps>(() => ({
  accessibilityLabel: props.accessibilityLabel,
  label: hasTextAndAction.value ? props.paginatedSelectAllText : props.label,
  selected: props.selected,
  disabled: props.disabled,
  ariaLive: ariaLive.value,
}));

const bulkActionLayoutClassName = computed(() => (
  classNames(
    styles.BulkActionsLayout,
    !hasMeasured.value && styles['BulkActionsLayout--measuring'],
  )
));

const actionSections = computed(() => getActionSections(props.actions));

const promotedActionsFiltered = computed(() => (
  props.promotedActions?.filter((_, index) => visiblePromotedActions.value.includes(index)) || []
));

const hiddenPromotedActionObjects = computed(() => (
  hiddenPromotedActions.value.map((index) => props.promotedActions?.[index])
));

const mergedHiddenPromotedActions = computed(() => (
  hiddenPromotedActionObjects.value.reduce(
    (memo, action) => {
      if (!action) return memo;
      if (instanceOfMenuGroupDescriptor(action)) {
        return memo.concat(action.actions);
      }
      return memo.concat(action);
    },
    [] as (BulkAction | MenuGroupDescriptor)[],
  )
));

const hiddenPromotedSection = computed(() => ({
  items: mergedHiddenPromotedActions.value,
}));

const allHiddenActions = computed(() => (
  props.actions
  ? props.actions
      .filter((action) => action)
      .map(
        (
          action: BulkAction | MenuGroupDescriptor | BulkActionListSection,
        ) => {
          if (instanceOfBulkActionListSection(action)) {
            return {items: [...action.items]};
          } else if (instanceOfMenuGroupDescriptor(action)) {
            return {items: [...action.actions]};
          }
          return {items: [action]};
        },
      )
  : []
));

const togglePopover = () => {
  emits('more-action-popover-toggle', popoverActive.value);
  popoverActive.value = !popoverActive.value;
};

const handleMeasurement = (measurements: ActionsMeasurements) => {
  if (!props.promotedActions || props.promotedActions.length === 0) {
    return;
  }

  const {
    hiddenActionsWidths: tmpActionsWidths,
    containerWidth: tmpContainerWidth,
    disclosureWidth: tmpDisclosureWidth,
  } = measurements;

  const {
    visiblePromotedActions: tmpVisiblePromotedActions,
    hiddenPromotedActions: tmpHiddenPromotedActions,
  } = getVisibleAndHiddenActionsIndices(
    props.promotedActions,
    tmpDisclosureWidth,
    tmpActionsWidths,
    tmpContainerWidth,
  );

  visiblePromotedActions.value = tmpVisiblePromotedActions;
  hiddenPromotedActions.value = tmpHiddenPromotedActions;
  containerWidth.value = tmpContainerWidth;
  disclosureWidth.value = tmpDisclosureWidth;
  actionsWidths.value = tmpActionsWidths;
  hasMeasured.value = true;
};

defineExpose({
  checkableButtonRef,
});
</script>
