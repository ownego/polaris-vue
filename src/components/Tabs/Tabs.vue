<template lang="pug">
div(:class="styles.Outer")
  Box(:padding="{ md: '200' }")
    TabMeasurer(
      :tabToFocus="state.tabToFocus",
      :selected="selected",
      :tabs="tabs",
      :siblingTabHasFocus="state.tabToFocus > -1",
      @measurement="handleMeasurement",
    )
      activator
    div(ref="scrollRef", :class="wrapperClassNames")
      div(ref="wrapRef", :class="styles.ButtonWrapper")
        ul(
          :role="tabData.length > 0 ? 'tablist' : undefined",
          :class="classname",
          @focus="handleFocus",
          @blur="handleBlur",
          @keydown="handleKeyDown",
          @keyup="handleKeyPress",
          data-tabs-focus-catchment,
        )
          Tab(
            v-for="_tab, index in tabData",
            v-bind="tabs[index]",
            ref=`${index === selected ? selectedTabRef : null}`,
            :actions="tabs[index].actions",
            :key="`${index}-${tabs[index].id}`",
            :id="tabs[index].id"
            :panelID="hasSlot(slots.default) ? tabs[index].panelID || `${tabs[index].id}-panel` : undefined",
            :disabled="disabled || tabs[index].disabled",
            :siblingTabHasFocus="state.tabToFocus > -1",
            :focused="index === state.tabToFocus",
            :selected="index === selected",
            :accessibilityLabel="tabs[index].accessibilityLabel"
            :url="tabs[index].url",
            :content="tabs[index].content",
            :viewNames="viewNames",
            @action="() => handleTabAction(tabs[index])",
            @toggle-modal="handleToggleModal",
            @toggle-popover="handleTogglePopover",
          )
          li(
            v-if="breakpoints.mdDown || tabsToShow.length === 0",
            role="presentation",
            :class="disclosureTabClassName",
          )
            Popover(
              preferredPosition="below",
              preferredAlignment="left",
              autofocusTarget="first-node",
              :active="disclosureActivatorVisible && state.showDisclosure",
              @close="handleClose",
            )
              template(#activator)
                activator
              List(
                :focusIndex="state.hiddenTabs.indexOf(state.tabToFocus)",
                :disclosureTabs="disclosureTabs"
                @click="handleListTabClick",
                @keypress="handleKeyPress",
              )
        div(
          v-if="canCreateNewView && tabsToShow.length > 0",
          :class="styles.NewTab",
        )
          CreateViewModal(
            :open="state.isNewViewModalActive",
            :viewNames="viewNames",
            @close="handleCloseNewViewModal",
            @click-primary-action="handleSaveNewViewModal",
          )
            Tab(
              v-if="disabled",
              :id="CREATE_NEW_VIEW_ID",
              :content="createViewA11yLabel",
              :actions="[]",
              :disabled="disabled",
              :tabIndexOverride="0",
              @toggle-popover="handleTogglePopover",
              @toggle-modal="handleToggleModal",
              @action="handleClickNewTab",
              @focus="handleTabFocus",
            )
              template(#icon)
                Icon(
                  :source="PlusIcon",
                  :accessibilityLabel="createViewA11yLabel",
                )
            div(v-else)
              Tooltip(
                preferredPosition="above",
                :content="i18n.translate('Polaris.Tabs.newViewTooltip')",
                :hoverDelay="400",
              )
                Tab(
                  :id="CREATE_NEW_VIEW_ID",
                  :content="createViewA11yLabel",
                  :actions="[]",
                  :disabled="disabled",
                  :tabIndexOverride="0",
                  @toggle-popover="handleTogglePopover",
                  @toggle-modal="handleToggleModal",
                  @action="handleClickNewTab",
                  @focus="handleTabFocus",
                )
                  template(#icon)
                    Icon(
                      :source="PlusIcon",
                      :accessibilityLabel="createViewA11yLabel",
                    )
  template(
    v-if="hasSlot(slots.default)",
    v-for="_tab, index in tabs",
  )
    Panel(
      v-if="selected === index",
      :key="tabs[index].id",
      :id="tabs[index].panelID || `${tabs[index].id}-panel`",
      :tabID="tabs[index].id",
    )
      slot
    Panel(
      v-else,
      hidden,
      :key="index",
      :id="tabs[index].panelID || `${tabs[index].id}-panel`",
      :tabID="tabs[index].id",
    )
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
  getCurrentInstance,
  reactive,
  computed,
  h,
  resolveComponent,
} from 'vue';
import { useBreakpoints } from '@/utilities/breakpoints';
import useI18n from '@/use/useI18n';
import type { VueNode } from '@/utilities/types';
import { useHasSlot } from '@/use/useHasSlot';
import { Icon, Tooltip, Popover } from '@/components';
import { Tab, TabMeasurer, CreateViewModal, Panel, List } from './components';
import type { TabMeasurements, TabProps } from './types';
import { getVisibleAndHiddenTabIndices } from './utilities';
import styles from '@polaris/components/Tabs/Tabs.module.scss';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';
import PlusIcon from '@icons/PlusIcon.svg';
import { classNames } from '@/utilities/css';

export interface TabsState {
  disclosureWidth: number;
  tabWidths: number[];
  visibleTabs: number[];
  hiddenTabs: number[];
  containerWidth: number;
  showDisclosure: boolean;
  tabToFocus: number;
  isTabPopoverOpen: boolean;
  isTabModalOpen: boolean;
  isNewViewModalActive: boolean;
  modalSubmitted: boolean;
  isTabsFocused: boolean;
}

export interface TabsProps {
  /** The items that map to each Tab. */
  tabs: TabProps[];
  /** The index of the currently selected Tab. */
  selected: number;
  /** Whether the Tabs are disabled or not. */
  disabled?: boolean;
  /** Whether to show the add new view Tab. */
  canCreateNewView?: boolean;
  /** Label for the new view Tab. Will override the default of "Create new view" */
  newViewAccessibilityLabel?: string;
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
}
const CREATE_NEW_VIEW_ID = 'create-new-view';

const props = defineProps<TabsProps>();

const slots = defineSlots<{
  /** Content to display in tabs */
  default?: (_?: VueNode) => any[];
}>();

const emits = defineEmits<{
  /** Optional callback invoked when a Tab becomes selected. */
  (e: 'select', selectedTabIndex: number): void;
  /** Optional callback invoked when a merchant saves a new view from the Modal */
  (e: 'create-new-view', value: string): Promise<boolean>;
}>();

const i18n = useI18n();
const breakpoints = useBreakpoints();
const currentInstance = getCurrentInstance();
const { hasSlot } = useHasSlot();

const scrollRef = ref<HTMLDivElement | null>(null);
const wrapRef = ref<HTMLDivElement | null>(null);
const selectedTabRef = ref<HTMLElement | null>(null);

const state = reactive<TabsState>({
  disclosureWidth: 0,
  containerWidth: Infinity,
  tabWidths: [],
  visibleTabs: [],
  hiddenTabs: [],
  showDisclosure: false,
  tabToFocus: -1,
  isNewViewModalActive: false,
  modalSubmitted: false,
  isTabsFocused: false,
  isTabPopoverOpen: false,
  isTabModalOpen: false,
});

const prevModalOpen = ref<boolean>(false);
const prevPopoverOpen = ref<boolean>(false);

const createViewA11yLabel = computed(() => props.newViewAccessibilityLabel
  || i18n.translate('Polaris.Tabs.newViewAccessibilityLabel'),
);

const tabsToShow = computed(() => breakpoints.value.mdDown
  ? [...state.visibleTabs, ...state.hiddenTabs]
  : state.visibleTabs,
);

const tabData = computed(() => tabsToShow.value
  .sort((tabA, tabB) => tabA - tabB)
  .filter((tabIndex) => props.tabs[tabIndex]),
);

const disclosureActivatorVisible = computed(() =>
  state.visibleTabs.length < props.tabs.length && !breakpoints.value.mdDown,
);

const classname = computed(() => classNames(
  styles.Tabs,
  props.fitted && styles.fitted,
  disclosureActivatorVisible.value && styles.fillSpace,
));

const wrapperClassNames = computed(() => classNames(
  styles.Wrapper,
  props.canCreateNewView && styles.WrapperWithNewButton,
));

const disclosureTabClassName = computed(() => classNames(
  styles.DisclosureTab,
  disclosureActivatorVisible.value && styles['DisclosureTab-visible'],
));

const disclosureTabs = computed(() =>
  state.hiddenTabs.map((tabIndex) => props.tabs[tabIndex]),
);

const viewNames = computed(() => props.tabs.map(({ content }) => content));

const handleTogglePopover = (isOpen: boolean) => {
  state.isTabPopoverOpen = isOpen;
};

const handleToggleModal = (isOpen: boolean) => {
  state.isTabModalOpen = isOpen;
};

const handleCloseNewViewModal = () => {
  state.isNewViewModalActive = false;
};

const handleSaveNewViewModal = async (value: string) => {
  if (!currentInstance?.vnode.props?.onCreateNewView) {
    return false;
  }

  const hasExecuted = await emits('create-new-view', value);
  if (hasExecuted) {
    state.modalSubmitted = true;
  }
  return hasExecuted;
};

const handleClickNewTab = () => {
  state.isNewViewModalActive = true;
};

const handleTabClick = (id: string) => {
  const tab = props.tabs.find((aTab) => aTab.id === id);
  if (tab == null) {
    return;
  }
  const selectedIndex = props.tabs.indexOf(tab);
  currentInstance?.vnode.props?.onSelect && emits('select', selectedIndex);
};

const handleFocus = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;
  const isItem = target.classList.contains(styles.Item);
  const isInNaturalDOMOrder =
    target.closest(`[data-tabs-focus-catchment]`) || isItem;
  const isDisclosureActivator = target.classList.contains(
    styles.DisclosureActivator,
  );

  if (isDisclosureActivator || !isInNaturalDOMOrder) {
    return;
  }

  state.isTabsFocused = true;
};

const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;
  const relatedTarget = event.relatedTarget as HTMLInputElement;
  const isInNaturalDOMOrder = relatedTarget?.closest?.(`.${styles.Tabs}`);
  const targetIsATab = target?.classList?.contains?.(styles.Tab);
  const focusReceiverIsAnItem = relatedTarget?.classList.contains(styles.Item);

  if (
    (!relatedTarget &&
      !state.isTabModalOpen &&
      !targetIsATab &&
      !focusReceiverIsAnItem) ||
    (!isInNaturalDOMOrder &&
      !state.isTabModalOpen &&
      !targetIsATab &&
      !focusReceiverIsAnItem)
  ) {
    state.tabToFocus = -1;
    return;
  }

  state.isTabsFocused = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (state.isTabPopoverOpen || state.isTabModalOpen || state.isNewViewModalActive) {
    return;
  }
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
};

const moveToSelectedTab = () => {
  const activeButton = selectedTabRef.value?.querySelector(
    `.${styles['Tab-active']}`,
  ) as HTMLElement;
  if (activeButton) {
    moveToActiveTab(activeButton.offsetLeft);
  }
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (state.isTabModalOpen || state.isTabPopoverOpen || state.isNewViewModalActive) {
    return;
  }
  const key = event.key;
  const tabsArrayInOrder =
    state.showDisclosure || breakpoints.value.mdDown
      ? state.visibleTabs.concat(state.hiddenTabs)
      : [...state.visibleTabs];

  let newFocus = tabsArrayInOrder.indexOf(state.tabToFocus);

  if (key === 'ArrowRight') {
    newFocus += 1;

    if (newFocus === tabsArrayInOrder.length) {
      newFocus = 0;
    }
  }

  if (key === 'ArrowLeft') {
    if (newFocus === -1 || newFocus === 0) {
      newFocus = tabsArrayInOrder.length - 1;
    } else {
      newFocus -= 1;
    }
  }

  const buttonToFocus = tabsArrayInOrder[newFocus];

  if (buttonToFocus != null) {
    state.tabToFocus = buttonToFocus;
  }
};

const handleDisclosureActivatorClick = () => {
  state.showDisclosure = !state.showDisclosure;
  state.tabToFocus = state.hiddenTabs[0];
};

const handleClose = () => {
  state.showDisclosure = false;
};

const handleMeasurement = (measurements: TabMeasurements) => {
  const {
    hiddenTabWidths: tabWidths,
    containerWidth,
    disclosureWidth,
  } = measurements;

  const { visibleTabs, hiddenTabs } = getVisibleAndHiddenTabIndices(
    props.tabs,
    props.selected,
    disclosureWidth,
    tabWidths,
    containerWidth,
  );

  state.visibleTabs = visibleTabs;
  state.hiddenTabs = hiddenTabs;
  state.disclosureWidth = disclosureWidth;
  state.containerWidth = containerWidth;
  state.tabWidths = tabWidths;
};

const handleListTabClick = (id: string) => {
  handleTabClick(id);
  handleClose();
  state.isTabsFocused = true;
};

const moveToActiveTab = (offsetLeft: number) => {
  setTimeout(() => {
    if (scrollRef.value && typeof scrollRef.value.scroll === 'function') {
      const scrollRefOffset = wrapRef?.value?.offsetLeft || 0;
      scrollRef?.value?.scroll({
        left: offsetLeft - scrollRefOffset,
      });
    }
  }, 0);
};

const handleTabFocus = () => {
  if (state.modalSubmitted) {
    state.tabToFocus = props.selected;
    state.modalSubmitted = false;
  }
};

const handleTabAction = (tab: TabProps) => {
  handleTabClick(tab.id);
  tab.onAction?.();
}

onMounted(() => {
  prevModalOpen.value = state.isTabModalOpen;
  prevPopoverOpen.value = state.isTabPopoverOpen;
});

watch(
  () => [
    prevPopoverOpen.value,
    state.isTabPopoverOpen,
    prevModalOpen.value,
    state.isTabModalOpen,
    props.selected,
    state.tabToFocus,
  ],
  () => {
    const hasModalClosed = prevModalOpen.value && !state.isTabModalOpen;
    const hasPopoverClosed = prevPopoverOpen.value && !state.isTabPopoverOpen;
    if (hasModalClosed) {
      state.isTabsFocused = true;
      state.tabToFocus = props.selected;
    } else if (hasPopoverClosed && !state.isTabModalOpen) {
      state.isTabsFocused = true;
      state.tabToFocus = props.selected;
    }
  },
);

watch(
  () => [
    state.containerWidth,
    state.disclosureWidth,
    props.tabs,
    props.selected,
    state.tabWidths,
  ],
  () => {
    const { visibleTabs, hiddenTabs } = getVisibleAndHiddenTabIndices(
      props.tabs,
      props.selected,
      state.disclosureWidth,
      state.tabWidths,
      state.containerWidth,
    );

    state.visibleTabs = visibleTabs;
    state.hiddenTabs = hiddenTabs;
  },
  { immediate: true }
);

watch(
  () => [
    props.selected,
    breakpoints.value.mdDown,
  ],
  () => {
    if (breakpoints.value.mdDown) {
      moveToSelectedTab();
    }
  },
);

watch(
  () => [
    state.isTabsFocused,
    props.selected,
    state.showDisclosure,
  ],
  () => {
    if (state.isTabsFocused && !state.showDisclosure) {
      state.tabToFocus = props.selected;
    }
  },
);

const activator = () => h(
  resolveComponent('UnstyledButton'),
  {
    type: 'button',
    class: classNames(styles.DisclosureActivator),
    disabled: props.disabled,
    'aria-label': props.disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel'),
    onClick: handleDisclosureActivatorClick,
  },
  () => [
    h(
      'template',
      () => [
        h(
          resolveComponent('Text'),
          { as: 'span', variant: 'bodySm', fontWeight: 'medium' },
          props.disclosureText ?? i18n.translate('Polaris.Tabs.toggleTabsLabel'),
        ),
        h(
          'div',
          {
            class: classNames(
              styles.IconWrap,
              disclosureActivatorVisible.value && state.showDisclosure && styles['IconWrap-open'],
            ),
          },
          h(
            resolveComponent('Icon'),
            { source: ChevronDownIcon, tone: 'subdued' },
          ),
        ),
      ],
    ),
  ],
);
</script>
