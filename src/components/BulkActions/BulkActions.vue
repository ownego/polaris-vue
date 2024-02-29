<template lang="pug">
div(
  ref="containerNode",
)
  transition(
    name="Group",
    ref="groupNode",
    @before-enter="onTransitionEnter",
    @enter="onTransitionEntered",
    @before-leave="onTransitionExiting"
    @leave="onTransitionExit",
  )
    div(
      v-if="selectMode",
      ref="groupNode",
      :class="groupClassName",
      :style=" width ? {  width: width + 'px' } : undefined",
    )
      EventListener(
        event="resize",
        :handler="handleResize",
      )
      div(
        :class="styles.ButtonGroupWrapper",
        ref="buttonsNode",
      )
        div(
          :class="styles.ButtonGroupInner"
        )
          template(
            v-if="hasPromotedActions || hasActionsPopover",
          )
            InlineStack(gap="300", block-align="center")
              CheckableButton(
                v-bind="CheckableButtonProps",
                @toggle-all="emits('toggle-all')",
              )
              InlineStack(gap="100", block-align="center")
                template(v-if="hasPromotedActions")
                  template(
                    v-for="action in promotedActions?.slice(0, numberOfPromotedActionsToRender)",
                  )
                    BulkActionMenu(
                      v-if="instanceOfMenuGroupDescriptor(action)",
                      v-bind="bulkActionPropsGenerate(action)",
                      :isNewBadgeInBadgeActions="isNewBadgeInBadgeActions",
                      :size="buttonSize",
                    )
                    BulkActionButton(
                      v-else,
                      :disabled="disabled",
                      v-bind="action",
                      :handleMeasurement="handleMeasurement",
                      :size="buttonSize",
                    )
                div(
                  v-if="hasActionsPopover",
                  :class="styles.Popover",
                  ref="moreActionsNode",
                )
                  Popover(
                    :active="popoverVisible",
                    @close="togglePopover",
                  )
                    template(#activator)
                      BulkActionButton(
                        disclosure,
                        :size="buttonSize",
                        :content="activatorLabel",
                        :disabled="disabled",
                        :indicator="isNewBadgeInBadgeActions",
                        :show-content-in-button="!hasPromotedActions"
                        @action="togglePopover",
                      )
                    ActionList(
                      :sections="combinedActions",
                      @action-any-item="togglePopover",
                    )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import {
  ActionList,
  Popover,
  InlineStack,
  CheckableButton,
  UnstyledButton,
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

const checkableButtonProps = computed(() => ({
  accessibilityLabel: props.accessibilityLabel,
  label: hasTextAndAction.value ? props.paginatedSelectAllText : props.label,
  selected: props.selected,
  disabled: props.disabled,
  ariaLive: ariaLive.value,
}));

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
</script>
