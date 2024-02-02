<template lang="pug">
div(
  ref="containerNode",
)
  Transition(
    v-if="selectMode",
    name="group",
    ref="groupNode",
    @before-enter="onTransitionEnter",
    @enter="onTransitionEntered",
    @before-leave="onTransitionExiting"
    @leave="onTransitionExit",
  )
    div(
      :class="groupClassName",
      ref="groupNode",
      :style="{width: width + 'px'}",
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
            InlineStack(gap="300")
              template(v-if="hasPromotedActions")
                template(
                  v-for="action, index in promotedActions?.slice(0, numberOfPromotedActionsToRender)",
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
                      :content="activatorLabel",
                      :disabled="disabled",
                      :indicator="isNewBadgeInBadgeActions",
                      :show-content-in-button="!hasPromotedActions"
                      @action="togglePopover",
                    )
                  template(#content)
                    ActionList(
                      :sections="combinedActions",
                      @action-any-item="togglePopover",
                    )
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { classNames } from '@/utilities/css';
import { debounce } from '@polaris/utilities/debounce';
import { clamp } from '@polaris/utilities/clamp';
import useI18n from '@/use/useI18n';
import {
  ActionList,
  Popover,
  InlineStack,
} from '@/components';
import { BulkActionButton, BulkActionMenu } from './components';
import type { BulkAction, BulkActionListSection, BulkActionsProps } from './utils';
import type { MenuGroupDescriptor, ActionListSection } from '@/utilities/types';
import styles from '@polaris/components/BulkActions/BulkActions.module.scss';

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

const i18n = useI18n();

const props = defineProps<BulkActionsProps>();
const emits = defineEmits<{
  /** Callback when selectable state of list is changed */
  'select-mode-toggle': [selectMode: boolean];
  /** Callback when more actions button is toggled */
  'more-action-popover-toggle': [isOpen: boolean];
}>();

const popoverVisible = ref<boolean>(false);
const containerWidth = ref<number>(0);
const measuring = ref<boolean>(true);
const statusTransitionGroup = ref<TransitionStatus>('entering');

const containerNode = ref<HTMLElement | null>(null);
const moreActionsNode = ref<HTMLElement | null>(null);
const groupNode = ref<HTMLDivElement | null>(null);
const buttonsNode = ref<HTMLDivElement | null>(null);

const promotedActionsWidths = ref<number[]>([]);
const bulkActionsWidth = ref(0);
const addedMoreActionsWidthForMeasuring = ref(0);

const handleResize = debounce(
  () => {
    if (containerNode.value) {
      const tmpContainerWidth = containerNode.value.getBoundingClientRect().width;
      if (tmpContainerWidth > 0) {
        containerWidth.value = tmpContainerWidth;
      }
    }

    if (popoverVisible.value) {
      popoverVisible.value = false;
    }
  },
  50,
  { trailing: true },
);

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

const actionSections = computed<BulkActionListSection[] | undefined | any>(() => {
  if (!props.actions || props.actions.length === 0) {
    return;
  }

  if (instanceOfBulkActionListSectionArray(props.actions)) {
    return props.actions;
  }

  if (instanceOfBulkActionArray(props.actions)) {
    return [{ items: props.actions }];
  }

  return undefined;
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
  const actions = actionSections.value;
  if (!actions) {
    return false;
  }

  for (const action of actions) {
    for (const item of action.items) {
      if (item.badge?.tone === 'new') {
        return true;
      }
    }
  }

  return false;
});

const combinedActions = computed<ActionListSection[]>(() => {
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

const activatorLabel = computed(() => {
  return !props.promotedActions ||
  (props.promotedActions && numberOfPromotedActionsToRender.value === 0 && !measuring.value)
    ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
    : i18n.translate('Polaris.ResourceList.BulkActions.moreActionsActivatorLabel');
});

const groupClassName = computed(() => {
  return classNames(
    styles.Group,
    !props.isSticky && styles['Group-not-sticky'],
    !(measuring.value) && props.isSticky && styles[`Group-${statusTransitionGroup.value}`],
    measuring.value && styles['Group-measuring'],
  );
});

const hasActionsPopover = computed(() => actionSections.value || rolledInPromotedActions.value.length > 0 || measuring.value);
const hasPromotedActions = computed(() => props.promotedActions && numberOfPromotedActionsToRender.value > 0);

const onTransitionEnter = () => {
  statusTransitionGroup.value = 'entering';
};

const onTransitionEntered = () => {
  statusTransitionGroup.value = 'entered';
};

const onTransitionExiting = () => {
  statusTransitionGroup.value = 'exiting';
};

const onTransitionExit = () => {
  statusTransitionGroup.value = 'exited';
};

const bulkActionPropsGenerate = (action: MenuGroupDescriptor | BulkAction) => {
  return action as MenuGroupDescriptor;
};

const handleMeasurement = (width: number) => {
  if (measuring.value) {
    promotedActionsWidths.value.push(width);
  }
};

const togglePopover = () => {
  emits('more-action-popover-toggle', popoverVisible.value);
  popoverVisible.value = !popoverVisible.value;
};

function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkActionListSection[] {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkAction[] {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}

function instanceOfMenuGroupDescriptor(
  action: MenuGroupDescriptor | BulkAction,
): action is MenuGroupDescriptor {
  return 'title' in action;
}

onMounted(() => {
   // Set time out to make sure all the nodes was rendered
  setTimeout(() => {
    if (props.promotedActions && !props.actions && moreActionsNode.value) {
      addedMoreActionsWidthForMeasuring.value =
        moreActionsNode.value.getBoundingClientRect().width;
    }

    bulkActionsWidth.value = buttonsNode.value
      ? buttonsNode.value.getBoundingClientRect().width -
        addedMoreActionsWidthForMeasuring.value
      : 0;

    if (containerNode.value) {
      containerWidth.value = containerNode.value.getBoundingClientRect().width;
      measuring.value = false;
    }
  }, 10);
});
</script>
