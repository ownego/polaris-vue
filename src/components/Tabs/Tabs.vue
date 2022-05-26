<template lang="pug">
div
  div(:class="styles.Wrapper")
    TabMeasurer(
      :tabToFocus="tabToFocus",
      :selected="selected",
      :tabs="tabs",
      :siblingTabHasFocus="tabToFocus > -1",
      @measurement="handleMeasurement",
    )
      template(#activator)
        div(
          v-if="disclosureText",
          :class="styles.TabContainer",
        )
          button(
            type="button",
            :class="disclosureButtonClassName",
            :aria-label="i18n.translate('Polaris.Tabs.toggleTabsLabel')",
            @click="handleDisclosureActivatorClick",
          )
            span(:class="disclosureButtonContentWrapperClassName")
              template(v-if="hasCustomDisclosure")
                | {{ disclosureText }}
                Icon(:source="CaretDownMinor", color="subdued")
              Icon(v-else, :source="HorizontalDotsMinor", color="subdued")
        button(
          v-else,
          type="button",
          :class="disclosureButtonClassName",
          :aria-label="i18n.translate('Polaris.Tabs.toggleTabsLabel')",
          @click="handleDisclosureActivatorClick",
        )
          span(:class="disclosureButtonContentWrapperClassName")
            template(v-if="hasCustomDisclosure")
              | {{ disclosureText }}
              Icon(:source="CaretDownMinor", color="subdued")
            Icon(v-else, :source="HorizontalDotsMinor", color="subdued")

      template(
        v-for="tab, index in tabs",
        :key="tab.id",
        #{#[tab.id]},
      )
        slot(
          v-if="hasSlot(slots[tab.id])",
          :name="tab.id",
        )
        template(v-else)
          | {{ tab.content }}

    ul(
      role="tablist",
      :class="className",
      @focus="handleFocus",
      @blur="handleBlur",
      @keydown="handleKeyDown",
      @keyup="handleKeyPress",
    )
      Tab(
        v-for="tab, index in sortedTab",
        :key="`${index}-${tabs[tab].id}`",
        :id="tabs[tab].id",
        :siblingTabHasFocus="tabToFocus > -1",
        :focused="index === tabToFocus",
        :selected="index === selected",
        :panelID="hasSlot(slots.default) ? (tabs[tab].panelID || `${tabs[tab].id}-panel`) : undefined",
        :accessibilityLabel="tabs[tab].accessibilityLabel",
        :url="tabs[tab].url",
        @click="handleTabClick",
      )
        template(v-if="hasSlot(slots[tabs[tab].id])")
          slot(:name="tabs[tab].id")
        template(v-else) {{ tabs[tab].content }}

      li(
        :class="disclosureTabClassName",
        role="presentation",
      )
        Popover(
          preferredPosition="below",
          :active="disclosureActivatorVisible && showDisclosure",
          @close="handleClose",
          autofocusTarget="first-node",
        )
          template(#activator)
            div(
              v-if="disclosureText",
              :class="styles.TabContainer",
            )
              button(
                type="button",
                :class="disclosureButtonClassName",
                :aria-label="i18n.translate('Polaris.Tabs.toggleTabsLabel')",
                @click="handleDisclosureActivatorClick",
              )
                span(:class="disclosureButtonContentWrapperClassName")
                  template(v-if="hasCustomDisclosure")
                    | {{ disclosureText }}
                    Icon(:source="CaretDownMinor", color="subdued")
                  Icon(v-else, :source="HorizontalDotsMinor", color="subdued")
            button(
              v-else,
              type="button",
              :class="disclosureButtonClassName",
              :aria-label="i18n.translate('Polaris.Tabs.toggleTabsLabel')",
              @click="handleDisclosureActivatorClick",
            )
              span(:class="disclosureButtonContentWrapperClassName")
                template(v-if="hasCustomDisclosure")
                  | {{ disclosureText }}
                  Icon(:source="CaretDownMinor", color="subdued")
                Icon(v-else, :source="HorizontalDotsMinor", color="subdued")
          template(#content)
            List(
              :focusIndex="hiddenTabs.indexOf(tabToFocus)",
              :disclosureTabs="disclosureTabs",
              @click="handleTabClick",
              @keypress="handleKeyPress",
            )
  template(
    v-if="hasSlot(slots.default)",
    v-for="tab, index in tabs",
    :key="tab.id",
  )
    Panel(
      v-if="selected === index",
      :id="tab.panelID || `${tab.id}-panel`",
      :tabID="tab.id",
    )
      slot
    Panel(
      :id="tab.panelID || `${tab.id}-panel`",
      :tabID="tab.id",
      hidden,
    )
</template>
<script setup lang="ts">
import { ref, computed, useSlots, onMounted } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import {
  Icon,
  Popover,
} from '@/components';
import { getVisibleAndHiddenTabIndices } from './utilities';
import HorizontalDotsMinor from '@icons/HorizontalDotsMinor.svg';
import CaretDownMinor from '@icons/CaretDownMinor.svg';
import styles from '@/classes/Tabs.json';
import { hasSlot } from '@/utilities/has-slot';
import { UseI18n } from '@/use';
import type { TabDescriptor, TabMeasurements } from './types';
import { List, Panel, Tab, TabMeasurer } from './components';

interface TabsProps {
  /** Index of selected tab */
  selected: number;
  /** List of tabs */
  tabs: TabDescriptor[];
  /** Fit tabs to container */
  fitted?: boolean;
  /** Text to replace disclosures horizontal dots */
  disclosureText?: string;
}

const i18n = UseI18n();
const props = defineProps<TabsProps>();
const slots = useSlots();

const emits = defineEmits<{
  /** Callback when tab is selected */
  (e: 'select', selectedTabIndex: number): void;
}>();

const getDerivedStateFromProps = (nextProps: TabsProps, prevState) => {
  const { disclosureWidth, tabWidths, containerWidth } = prevState;
  const { visibleTabs: tmpVisibleTabs, hiddenTabs: tmpHiddenTabs } = getVisibleAndHiddenTabIndices(
    nextProps.tabs,
    nextProps.selected,
    disclosureWidth,
    tabWidths,
    containerWidth,
  );

  visibleTabs.value = tmpVisibleTabs;
  hiddenTabs.value = tmpHiddenTabs;
}

onMounted(() => {
  getDerivedStateFromProps(
    { tabs: props.tabs, selected: props.selected },
    {
      disclosureWidth: disclosureWidth.value,
      tabWidths: tabWidths.value,
      containerWidth: containerWidth.value,
    },
  )
});

const disclosureWidth = ref(0);
const containerWidth = ref<number>(Infinity);
const tabWidths = ref<number[]>([]);
const visibleTabs = ref<number[]>([]);
const hiddenTabs = ref<number[]>([]);
const showDisclosure = ref(false);
const tabToFocus = ref(-1);

const disclosureActivatorVisible = computed(() => visibleTabs.value.length < props.tabs.length);
const hasCustomDisclosure = computed(() => !!props.disclosureText);

const className = computed(() => classNames(
  styles.Tabs,
  props.fitted && styles.fitted,
  disclosureActivatorVisible.value && styles.fillSpace,
));

const disclosureTabClassName = computed(() => classNames(
  styles.DisclosureTab,
  disclosureActivatorVisible.value && styles['DisclosureTab-visible'],
));

const disclosureButtonClassName = computed(() => classNames(
  styles.DisclosureActivator,
  hasCustomDisclosure.value && styles.Tab,
));

const disclosureButtonContentWrapperClassName = computed(() => classNames(
  styles.Title,
  hasCustomDisclosure.value && styles.titleWithIcon,
));

const sortedTab = computed(() => {
  const tmpVisibleTabs = [...visibleTabs.value];
  return tmpVisibleTabs.sort((a, b) => a - b);
});

const disclosureTabs = computed(() => {
  return hiddenTabs.value.map((tabIndex) => props.tabs[tabIndex]);
});

const handleKeyPress = (event: KeyboardEvent) => {
  const key = event.key;
  const tabsArrayInOrder: number[] = showDisclosure.value
    ? visibleTabs.value.concat(hiddenTabs.value)
    : [...visibleTabs.value];

  let newFocus = tabsArrayInOrder.indexOf(tabToFocus.value);

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

  tabToFocus.value = tabsArrayInOrder[newFocus];
};

const handleFocus = (event: FocusEvent) => {
  // If we are explicitly focusing a non-selected tab, this focuses it
  const target = event.target as HTMLUListElement;

  if (
    target.classList.contains(styles.Tab) ||
    target.classList.contains(styles.Item)
  ) {
    let tmpTabToFocus = -1;

    props.tabs.some((tab, index) => {
      if (tab.id === target.id) {
        tmpTabToFocus = index;
        return true;
      }

      return false;
    });

    tabToFocus.value = tmpTabToFocus;
    return;
  }

  if (target.classList.contains(styles.DisclosureActivator)) {
    return;
  }

  // If we are coming in from somewhere other than another tab, focus the
  // selected tab, and the focus (click) is not on the disclosure activator,
  // focus the selected tab
  if (!event.relatedTarget) {
    tabToFocus.value = props.selected;
    return;
  }

  const relatedTarget = event.relatedTarget;

  if (
    relatedTarget instanceof HTMLElement &&
    !relatedTarget.classList.contains(styles.Tab) &&
    !relatedTarget.classList.contains(styles.Item) &&
    !relatedTarget.classList.contains(styles.DisclosureActivator)
  ) {
    tabToFocus.value = props.selected;
  }
};

const handleBlur = (event: FocusEvent) => {
  // If we blur and the target is not another tab, forget the focus position
  if (event.relatedTarget == null) {
    tabToFocus.value = -1;
    return;
  }

  const target = event.relatedTarget;

  // If we are going to anywhere other than another tab, lose the last focused tab
  if (
    target instanceof HTMLElement &&
    !target.classList.contains(styles.Tab) &&
    !target.classList.contains(styles.Item)
  ) {
    tabToFocus.value = -1;
  }
};

const handleDisclosureActivatorClick = () => {
  showDisclosure.value = !showDisclosure.value;
};

const handleClose = () => {
  showDisclosure.value = false;
};

const handleMeasurement = (measurements: TabMeasurements) => {
  const tabIndices = getVisibleAndHiddenTabIndices(
    props.tabs,
    props.selected,
    measurements.disclosureWidth,
    measurements.hiddenTabWidths,
    measurements.containerWidth,
  );

  tabToFocus.value = tabToFocus.value === -1 ? -1 : props.selected;
  visibleTabs.value = tabIndices.visibleTabs;
  hiddenTabs.value = tabIndices.hiddenTabs;
  disclosureWidth.value = measurements.disclosureWidth;
  containerWidth.value = measurements.containerWidth;
  tabWidths.value = measurements.hiddenTabWidths;
};

const handleTabClick = (id: string) => {
  const tab = props.tabs.findIndex((aTab) => aTab.id === id);
  if (tab === -1) {
    return;
  }

  emits('select', tab);
};

function handleKeyDown(event: KeyboardEvent) {
  const { key } = event;

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();
    event.stopPropagation();
  }
}
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Tabs/Tabs.scss';
</style>
