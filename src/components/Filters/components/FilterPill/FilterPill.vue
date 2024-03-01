<template lang="pug">
div(
  v-if="!disabled",
  ref="elementRef"
)
  Popover(
    :active="popoverActive",
    :key="filterKey",
    :prevent-close-on-child-overlay-click="!closeOnChildOverlayClick",
    preferred-alignment="left",
    @close="handlePopoverClose",
  )
    //- Activator
    template(#activator)
      div(:class="buttonClasses")
        InlineStack(gap="0", :wrap="false")
          UnstyledButton(
            type="button",
            :class="toggleButtonClassNames",
            @click="togglePopoverActive",
            @focus="setFocusedTrue",
            @blur="setFocusedFalse",
          )
            InlineStack(
              align="center",
              block-align="center",
              gap="0",
              :wrap="false",
            )
              div(:class="styles.Label")
                Text(:variant="labelVariant", as="span") {{ label }}
              div(
                v-if="!selected"
                :class="styles.IconWrapper",
              )
                Icon(
                  :source="ChevronDownIcon",
                  tone="base"
                )
          UnstyledButton(
            v-if="selected",
            type="button",
            :className="clearButtonClassNames",
            :aria-label="i18n.translate('Polaris.FilterPill.clear')",
            @click="handleClear",
          )
            div(:class="styles.IconWrapper")
              Icon(
                :source="XSmallIcon",
                tone="base"
              )
    //- Content
    div(:class="styles.PopoverWrapper")
      PopoverSection
        BlockStack(gap="100")
          //-Filter
          component(:is="filter")
          //-ClearButtonMarkup
          div(
            v-if="!hideClearButton",
            :class="styles.ClearButtonWrapper"
          )
            Button(
              variant="plain",
              :disabled="!selected",
              textAlign="left",
              @click="handleClear",
            ) {{ i18n.translate('Polaris.FilterPill.clear') }}
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
  Popover,
  PopoverSection,
  BlockStack,
  Button,
  Icon,
  Text,
  InlineStack,
  UnstyledButton,
} from '@/components';
import { classNames } from '@/utilities/css';
import type { FilterInterface } from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { useToggle } from '@/use/useToggle';
import { useBreakpoints } from '@/use/useBreakpoints';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';
import XSmallIcon from '@icons/XSmallIcon.svg';
import styles from '@polaris/components/Filters/components/FilterPill/FilterPill.module.scss';

interface FilterPillProps extends FilterInterface {
  /** A unique identifier for the filter */
  filterKey: string;
  /** Whether the filter is selected or not */
  selected?: boolean;
  /** Whether the Popover will be initially open or not */
  initialActive: boolean;
  /** Whether filtering is disabled */
  disabled?: boolean;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
}

type FilterPillEvents = {
  /** Callback invoked when the filter is clicked */
  'click': [name: string];
  /** Callback invoked when the filter is removed */
  'remove': [name: string];
};

const props = defineProps<FilterPillProps>();
const emits = defineEmits<FilterPillEvents>();

const i18n = useI18n();
const breakpoints = useBreakpoints();
const {
  value: focused,
  setTrue: setFocusedTrue,
  setFalse: setFocusedFalse,
} = useToggle(false);

const popoverActive = ref(props.initialActive);
const elementRef = ref<HTMLElement | null>(null);

const buttonClasses = computed(() => classNames(
  styles.FilterButton,
  props.selected && styles.ActiveFilterButton,
  popoverActive.value && styles.FocusFilterButton,
  focused.value && styles.FocusFilterButton,
));

const clearButtonClassNames = computed(() => classNames(
  styles.PlainButton,
  styles.clearButton,
));

const toggleButtonClassNames = computed(() => classNames(
  styles.PlainButton,
  styles.ToggleButton,
));

const labelVariant = computed(() => (breakpoints.value.mdDown ? 'bodyLg' : 'bodySm'));

const togglePopoverActive = () => {
  if (props.filter) {
    popoverActive.value = !popoverActive.value;
  }

  emits('click', props.filterKey);
};

const handlePopoverClose = () => {
  togglePopoverActive();
  if (!props.selected) {
    emits('remove', props.filterKey);
  }
};

const handleClear = () => {
  emits('remove', props.filterKey);

  popoverActive.value = false;
};

const handleScroll = () => {
  const node = elementRef.value;

  if (!node || !popoverActive.value) {
    return;
  }

  const parent = node.parentElement?.parentElement;

  if (!parent) {
    return;
  }

  parent.scroll?.({
    left: node.offsetLeft,
  });
};

onMounted(() => {
  handleScroll();
});

watch(
  () => popoverActive.value,
  () => {
    handleScroll();
  },
);
</script>

