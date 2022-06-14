<template lang="pug">
div(
  ref="containerNode",
  v-if="selectMode",
)
  div(v-if="smallScreen")
    div(
      :class="smallScreenGroupClassName",
      ref="smallScreenGroupNode",
    )
      div(:class="styles.ButtonGroupWrapper")
        ButtonGroup(segmented)
          div(
            todo="csstransition"
            :class="slideClasses",
          )
            div(
              :class="styles.CheckableContainer",
              ref="checkableWrapperNode",
            )
              CheckableButton(v-bind="checkableButtonProps", smallScreen)
          div(
            v-if="actionSections || rolledInPromotedActions.length > 0 || measuring",
            ref="moreActionsNode",
          )
            Popover(
              :active="smallScreenPopoverVisible",
              @close="toggleSmallScreenPopover",
            )
              template(#activator)
                BulkActionButton(
                  disclosure,
                  :content="i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')",
                  :disabled="disabled",
                  :indicator="isNewBadgeInBadgeActions",
                  @action="toggleSmallScreenPopover",
                )
              template(#content)
                ActionList(
                  :items="promotedActions",
                  :sections="actionSections",
                  @action-any-item="toggleSmallScreenPopover",
                )
          Button(
            :disabled="disabled",
            @click="setSelectMode(false)",
          )
            | {{ i18n.translate('Polaris.Common.cancel') }}
      div(
        v-if="paginatedSelectAllAction",
        :class="styles.PaginatedSelectAll"
      )
        span(v-if="paginatedSelectAllText && paginatedSelectAllAction", aria-live="polite") {{ paginatedSelectAllText }}
        template(v-else) {{ paginatedSelectAllText }}
        Button(
          v-if="paginatedSelectAllAction && paginatedSelectAllAction.onAction",
          plain,
          :disabled="disabled",
          @click="paginatedSelectAllAction.onAction",
        ) {{ paginatedSelectAllAction.content }}

  div(v-else)
    div(
      :class="largeScreenGroupClassName",
      ref="largeScreenGroupNode",
    )
      EventListener(event="resize", :handler="handleResize")
      div(
        :class="styles.ButtonGroupWrapper",
        ref="largeScreenButtonsNode",
      )
        ButtonGroup(
          v-if="(promotedActions && numberOfPromotedActionsToRender > 0) || hasActionsPopover",
          segmented,
          no-item-wrap,
        )
          ButtonGroupItem
            CheckableButton(v-bind="checkableButtonProps", @toggle-all="emits('toggle-all')")
          ButtonGroupItem(
            v-if="promotedActions && numberOfPromotedActionsToRender > 0"
            v-for="action, index in promotedActions.slice(0, numberOfPromotedActionsToRender)",
            :key="index",
          )
            BulkActionMenu(
              v-if="instanceOfMenuGroupDescriptor(action)",
              v-bind="bulkActionPropsGenerate(action)",
              :isNewBadgeInBadgeActions="isNewBadgeInBadgeActions",
            )
            BulkActionButton(
              v-else,
              :disabled="disabled",
              v-bind="action",
              :handleMeasurement="handleMeasurement",
            )
          ButtonGroupItem(v-if="hasActionsPopover")
            div(ref="moreActionsNode")
              Popover(
                :active="largeScreenPopoverVisible",
                @close="toggleLargeScreenPopover",
              )
                template(#activator)
                  BulkActionButton(
                    disclosure,
                    :content="activatorLabel",
                    :disabled="disabled",
                    :indicator="isNewBadgeInBadgeActions",
                    @action="toggleLargeScreenPopover",
                  )
                template(#content)
                  ActionList(
                    :sections="combinedActions",
                    @action-any-item="toggleLargeScreenPopover",
                  )
        CheckableButton(v-else, v-bind="checkableButtonProps", @toggle-all="emits('toggle-all')")
      div(
        v-if="paginatedSelectAllAction",
        :class="styles.PaginatedSelectAll"
      )
        span(v-if="paginatedSelectAllText && paginatedSelectAllAction", aria-live="polite") {{ paginatedSelectAllText }}
        template(v-else) {{ paginatedSelectAllText }}
        Button(
          v-if="paginatedSelectAllAction && paginatedSelectAllAction.onAction",
          plain,
          :disabled="disabled",
          @click="paginatedSelectAllAction.onAction",
        ) {{ paginatedSelectAllAction.content }}
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { clamp } from 'polaris/polaris-react/src/utilities/clamp';
import type { MenuGroupDescriptor } from '@/components/ActionMenu/components/MenuGroup/utils';
import type { Action } from '@/utilities/type';
import { UseI18n } from '@/use';
import styles from '@/classes/BulkActions.json';
import { ActionList, Popover, Button, ButtonGroup, ButtonGroupItem, CheckableButton, EventListener } from '@/components';
import { BulkActionButton, BulkActionMenu } from './components';
import type { BulkAction, BulkActionListSection } from './utils';

interface BulkActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Whether to render the small screen BulkActions or not */
  smallScreen?: boolean;
  /** Label for the bulk actions */
  label?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
}

const props = defineProps<BulkActionsProps>();

const i18n = UseI18n();

const emits = defineEmits<{
  /** Callback when the select all checkbox is clicked */
  (e: 'toggle-all'): void;
  /** Callback when selectable state of list is changed */
  (e: 'select-mode-toggle', selectMode: boolean): void;
  /** Callback when more actions button is toggled */
  (e: 'more-action-popover-toggle', isOpen: boolean): void;
}>();

const smallScreenPopoverVisible = ref<boolean>(false);
const largeScreenPopoverVisible = ref<boolean>(false);
const containerWidth = ref<number>(0);
const measuring = ref<boolean>(true);

const containerNode = ref<HTMLElement | null>(null);
const largeScreenButtonsNode = ref<HTMLElement | null>(null);
const moreActionsNode = ref<HTMLElement | null>(null);
const checkableWrapperNode = ref<HTMLDivElement | null>(null);
const largeScreenGroupNode = ref<HTMLDivElement | null>(null);
const smallScreenGroupNode = ref<HTMLDivElement | null>(null);

const promotedActionsWidths = ref<number[]>([]);
const bulkActionsWidth = ref(0);
const addedMoreActionsWidthForMeasuring = ref(0);

const handleResize = computed(() => debounce(
  () => {
    if (containerNode.value) {
      const tmpContainerWidth = containerNode.value.getBoundingClientRect().width;
      if (tmpContainerWidth > 0) {
        containerWidth.value = tmpContainerWidth;
      }
    }

    if (smallScreenPopoverVisible.value || largeScreenPopoverVisible.value) {
      smallScreenPopoverVisible.value = false;
      largeScreenPopoverVisible.value = false;
    }
  },
  50,
  {trailing: true},
));

const numberOfPromotedActionsToRender = computed<number>(() => {
  if (!props.promotedActions) {
    return 0;
  }

  if (containerWidth.value >= bulkActionsWidth.value || measuring.value) {
    return props.promotedActions.length;
  }

  let sufficientSpace = false;
  let counter = props.promotedActions.length - 1;
  let totalWidth = 0;

  while (!sufficientSpace && counter >= 0) {
    totalWidth += promotedActionsWidths.value[counter];
    const widthWithRemovedAction =
      bulkActionsWidth.value -
      totalWidth +
      addedMoreActionsWidthForMeasuring.value;
    if (containerWidth.value >= widthWithRemovedAction) {
      sufficientSpace = true;
    } else {
      counter--;
    }
  }

  return clamp(counter, 0, props.promotedActions.length);
});

const actionSectionsHandler = (): BulkActionListSection[] | undefined => {
  if (!props.actions || props.actions.length === 0) {
    return;
  }

  if (instanceOfBulkActionListSectionArray(props.actions)) {
    return props.actions as BulkActionListSection[];
  }

  if (instanceOfBulkActionArray(props.actions)) {
    return [{ items: props.actions as BulkAction[] }];
  }

  return undefined;
};

const actionSections = computed(actionSectionsHandler);

const checkableButtonProps = computed(() => {
  return {
    accessibilityLabel: props.accessibilityLabel,
    label: props.label,
    selected: props.selected,
    selectMode: props.selectMode,
    measuring: measuring.value,
    disabled: props.disabled,
  };
});

const rolledInPromotedActions = computed(() => {
  const number = numberOfPromotedActionsToRender.value;

  if (
    !props.promotedActions ||
    props.promotedActions.length === 0 ||
    number >= props.promotedActions.length
  ) {
    return [];
  }

  const rolled = props.promotedActions.map((action) => {
    if (instanceOfMenuGroupDescriptor(action)) {
      const group = action as MenuGroupDescriptor;
      return { items: [...group.actions]};
    }
    return {items: [action]};
  });

  return rolled.slice(number);
});

const isNewBadgeInBadgeActions = computed(() => {
  const actions = actionSectionsHandler();
  if (!actions) {
    return false;
  }

  for (const action of actions) {
    for (const item of action.items) {
      if (item.badge?.status === 'new') {
        return true;
      }
    }
  }

  return false;
});

const combinedActions = computed(() => {
  if (actionSections.value && rolledInPromotedActions.value.length > 0) {
    return [...rolledInPromotedActions.value, ...actionSections.value];
  }
  if (actionSections.value) {
    return actionSections.value;
  }
  if (rolledInPromotedActions.value.length > 0) {
    return rolledInPromotedActions.value;
  }
  return [];
});

const smallScreenGroupClassName = computed(() => classNames(
  styles.Group,
  styles['Group-smallScreen'],
  // styles[`Group-${status}`],
));

const largeScreenGroupClassName = computed(() => classNames(
  styles.Group,
  styles['Group-largeScreen'],
  !measuring.value && styles['Group-entered'],
  measuring.value && styles['Group-measuring'],
));

const slideClasses = 'TODO';

const activatorLabel = computed(() => {
  return !props.promotedActions ||
  (props.promotedActions && numberOfPromotedActionsToRender.value === 0 && !measuring.value)
    ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
    : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
});

const hasActionsPopover = computed(() => actionSections.value || rolledInPromotedActions.value.length > 0 || measuring.value);

watch(
  () => props.selectMode,
  () => {
    // Set time out to make sure all the nodes was rendered
    setTimeout(() => {
      if (props.promotedActions && !props.actions && moreActionsNode.value) {
        addedMoreActionsWidthForMeasuring.value =
          moreActionsNode.value.getBoundingClientRect().width;
      }

      bulkActionsWidth.value = largeScreenButtonsNode.value
        ? largeScreenButtonsNode.value.getBoundingClientRect().width -
          addedMoreActionsWidthForMeasuring.value
        : 0;

      if (containerNode.value) {
        containerWidth.value = containerNode.value.getBoundingClientRect().width;
        measuring.value = false;
      }
    }, 1);
  },
);

const toggleSmallScreenPopover = () => {
  emits('more-action-popover-toggle', smallScreenPopoverVisible.value);
  smallScreenPopoverVisible.value = !smallScreenPopoverVisible.value;
};

const toggleLargeScreenPopover = () => {
  emits('more-action-popover-toggle', largeScreenPopoverVisible.value);
  largeScreenPopoverVisible.value = !largeScreenPopoverVisible.value;
};

const handleMeasurement = (width: number) => {
  if (measuring.value) {
    promotedActionsWidths.value.push(width);
  }
};

const setSelectMode = (val: boolean) => {
  emits('select-mode-toggle', val);
};

const bulkActionPropsGenerate = (action: MenuGroupDescriptor | BulkAction) => {
  return action as MenuGroupDescriptor;
};

// Common functions
function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
) {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
) {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}

function instanceOfMenuGroupDescriptor(
  action: MenuGroupDescriptor | BulkAction,
) {
  return !!action['title'];
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/BulkActions/BulkActions.scss';
</style>
