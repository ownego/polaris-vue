<template lang="pug">
div(
  v-if="rightPopoverableActions",
  :class="styles.ProxyButtonContainer",
  ref="proxyButtonContainer",
  aria-hidden,
)
  div(
    v-for="action in rightPopoverableActions",
    :key="action.key",
    :data-key="action.key",
  )
    Button(
      disclosure,
      :disabled="disabled || action.disabled",
      @click="action.onAction",
    ) {{ action.content }}
div(:class="styles.Wrapper")
  div(:class="className", ref="containerRef")
    div(
      v-if="hasSlot(slots.default)",
      :class="styles.CenterContainer",
    )
      Item
        slot
    div(v-if="actionsToRender.length > 0", :class="RightContainerClassName")
      Item(
        v-for="action in actionsToRender",
        :key="action.key",
      )
        Popover(
          :active="action.popoverOpen",
          preferredAlignment="left",
          sectioned,
          @close="action.onAction",
        )
          template(#activator)
            Button(
              disclosure,
              :disabled="disabled || action.disabled",
              :id="`Activator-${action.key}`",
              @click="action.onAction",
            ) {{ action.content }}
          template(#content)
            slot(:name="`popover-${action.key}`")
    div(
      v-if="hasSlot(slots.rightAction)",
      ref="moreFiltersButtonContainer",
      :class="moreFiltersButtonContainerClassname",
    )
      Item(v-if="shouldRenderMoreFiltersButton")
        slot(name="rightAction")
    EventListener(event="resize", :handler="handleResize")
  div(
    v-if="hasSlot(slots.auxiliary)",
    :class="styles.AuxiliaryContainer"
  )
    slot(name="auxiliary")
</template>

<script setup lang="ts">
import { computed, ref, onMounted, useSlots } from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { hasSlot } from '@/utilities/has-slot';
import type { DisableableAction } from '@/utilities/interface';
import type { PopoverableAction } from '../../utils';
import { Popover, Button, EventListener } from '@/components';
import styles from '@/classes/Filters-ConnectedFilterControl.json';

import { Item } from './components';

interface Props {
  rightPopoverableActions?: PopoverableAction[];
  disabled?: boolean;
  forceShowMorefiltersButton?: boolean;
  queryFieldHidden?: boolean;
}

const FILTER_FIELD_MIN_WIDTH = 150;

const props = withDefaults(defineProps<Props>(), {
  forceShowMorefiltersButton: true,
});

const slots = useSlots();

const availableWidth = ref<number>(0);
const proxyButtonsWidth = ref<Record<string, number>>({});

const containerRef = ref<HTMLDivElement | null>(null);
const proxyButtonContainer = ref<HTMLDivElement | null>(null);
const moreFiltersButtonContainer = ref<HTMLDivElement | null>(null);

const handleResize = debounce(
  () => {
    measureProxyButtons();
    measureAvailableWidth();
  },
  40,
  {leading: true, trailing: true, maxWait: 40},
);

onMounted(() => {
  handleResize();
});

const actionsToRender = computed(() =>
  props.rightPopoverableActions != null
    ? getActionsToRender(props.rightPopoverableActions)
    : [],
);

const className = computed(() => classNames(
  styles.ConnectedFilterControl,
  props.rightPopoverableActions && styles.right,
));

const shouldRenderMoreFiltersButton = computed(() =>
  props.forceShowMorefiltersButton
  || (props.rightPopoverableActions
    && props.rightPopoverableActions.length !== actionsToRender.value.length),
);

const RightContainerClassName = computed(() => classNames(
  styles.RightContainer,
  !shouldRenderMoreFiltersButton.value && styles.RightContainerWithoutMoreFilters,
  props.queryFieldHidden && styles.queryFieldHidden,
));

const moreFiltersButtonContainerClassname = computed(() => classNames(
  styles.MoreFiltersButtonContainer,
  actionsToRender.value.length === 0 && styles.onlyButtonVisible,
));

const measureProxyButtons = () => {
  if (proxyButtonContainer.value) {
    const tmpProxyButtonsWidth = {};
    // this number is magical, but tweaking it solved the problem of items overlapping
    const tolerance = 78;
    if (proxyButtonContainer.value) {
      Array.from(proxyButtonContainer.value.children).forEach(
        (element: Element) => {
          const buttonWidth =
            element.getBoundingClientRect().width + tolerance;
          const buttonKey =
            element instanceof HTMLElement && element.dataset.key;
          if (buttonKey) {
            tmpProxyButtonsWidth[buttonKey] = buttonWidth;
          }
        },
      );
    }

    proxyButtonsWidth.value = tmpProxyButtonsWidth;
  }
}

const measureAvailableWidth = () => {
  if (containerRef.value && moreFiltersButtonContainer.value) {
    const containerWidth =
      containerRef.value.getBoundingClientRect().width;
    const moreFiltersButtonWidth =
      moreFiltersButtonContainer.value.getBoundingClientRect().width;
    const filtersActionWidth = 0;

    const filterFieldMinWidth = props.queryFieldHidden
      ? 0
      : FILTER_FIELD_MIN_WIDTH;

    const tmpAvailableWidth =
      containerWidth -
      filterFieldMinWidth -
      moreFiltersButtonWidth -
      filtersActionWidth;

    availableWidth.value = tmpAvailableWidth;
  }
}

const getActionsToRender = (
  actions: PopoverableAction[],
): PopoverableAction[] => {
  let remainingWidth = availableWidth.value;
  const actionsToReturn: PopoverableAction[] = [];
  for (let i = 0; remainingWidth > 0 && i < actions.length; i++) {
    const action = actions[i];
    const actionWidth = proxyButtonsWidth.value[action.key];
    if (actionWidth <= remainingWidth) {
      actionsToReturn.push(action);
      remainingWidth -= actionWidth;
    } else {
      // When we can't fit an action, we break the loop.
      // The ones that didn't fit will be accessible through the "More filters" button
      break;
    }
  }
  return actionsToReturn;
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Filters/components/ConnectedFilterControl/ConnectedFilterControl.scss';
</style>
