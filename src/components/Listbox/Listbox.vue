<template lang="pug">
template(v-if="keyboardEventsEnabled || textFieldFocused")
  KeypressListener(
    keyEvent="keydown",
    :keyCode="Key.ArrowDown",
    :handler="handleDownArrow",
  )
  KeypressListener(
    keyEvent="keydown",
    :keyCode="Key.ArrowUp",
    :handler="handleUpArrow",
  )
  KeypressListener(
    keyEvent="keydown",
    :keyCode="Key.Enter",
    :handler="handleEnter",
  )
VisuallyHidden
  div(aria-live="polite") {{ loading ? loading : null }}
ul(
  v-if="$slots.default",
  tabindex="0",
  role="listbox",
  :class="classNames(styles.Listbox)",
  :aria-label="inCombobox ? undefined : accessibilityLabel",
  :aria-labelledby="textFieldLabelId || undefined",
  :aria-busy="Boolean(loading)",
  :asia-activedescendant="activeOption && activeOption.domId",
  :id="listId",
  @focus="handleFocus",
  @blur="handleBlur",
  ref="listboxRef",
)
  slot
</template>

<script setup lang="ts">
import {
  provide,
  inject,
  ref,
  computed,
  watch,
  onUpdated,
  useSlots,
  withDefaults,
} from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { scrollable } from 'polaris/polaris-react/src/components/shared';
import { scrollOptionIntoView } from 'polaris/polaris-react/src/utilities/listbox/utilities';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Listbox.json';
import type { ComboboxListboxType, NavigableOption } from '@/utilities/interface';
import { KeypressListener } from '../KeypressListener';
import { Key } from '../KeypressListener/utils';
import { AutoSelection } from './utils';
import { VisuallyHidden } from '../VisuallyHidden';

export type ArrowKeys = 'up' | 'down';

const OPTION_SELECTOR = '[data-listbox-option]';
const OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
const OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';
const OPTION_FOCUS_ATTRIBUTE = 'data-focused';

interface ListboxProps {
  autoSelection?: AutoSelection;
  /** Explicitly enable keyboard control */
  enableKeyboardControl?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Provide a custom ID for the list element */
  customListId?: string;
}

provide('withinListboxContext', true);

const comboboxListboxContext = inject<ComboboxListboxType>('comboboxListboxContext', {});

const {
  listboxId,
  textFieldLabelId,
  textFieldFocused,
  willLoadMoreOptions,
  setActiveOptionId,
  setListboxId,
  onOptionSelected,
  onKeyToBottom,
} = comboboxListboxContext;

const props = withDefaults(defineProps<ListboxProps>(), { 
  autoSelection: AutoSelection.FirstSelected,
});
const slots = useSlots();

const emits = defineEmits<{
  (event: 'select', value: string): void
  (event: 'on-active-option-change', value: string): void
}>();

const { useUniqueId  } = UseUniqueId();
const listId = props.customListId || useUniqueId('Listbox');

const inCombobox = computed(() => Boolean(setActiveOptionId));
const listBoxId = computed(() => listboxId || '');

const listboxRef = ref<HTMLUListElement | null>(null);
const scrollableRef = ref<HTMLElement | null>(null);

const loading = ref('');
const lazyLoading = ref(false);
const currentOptions = ref<HTMLElement[]>([]);
const keyboardEventsEnabled = ref(Boolean(props.enableKeyboardControl));

let activeOption: NavigableOption | undefined;

watch(
  [
    () => listId,
    () => listBoxId,
  ],
  () => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  },
);

watch(
  [
    () => activeOption,
    () => loading,
  ],
  () => {
    if (
      !loading.value
      && slots.default
      && slots.default().length > 0
    ) {
      resetActiveOption();
    }
  },
);

watch(
  [
    () => props.enableKeyboardControl,
    () => keyboardEventsEnabled,
  ],
  () => {
    if (props.enableKeyboardControl && !keyboardEventsEnabled.value) {
      keyboardEventsEnabled.value = true;
    }
  },
);

const getNavigableOptions = (): [] | HTMLElement[] => {
  if (!listboxRef.value) {
    return [];
  }

  return [
    ...new Set(
      listboxRef.value.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
    ),
  ];
};

const getFirstNavigableOption = (
  currentOpts: HTMLElement[],
): boolean | Record<string, any> | void => {
  const hasSelectedOptions = currentOpts.some(
    (option) => option.getAttribute('aria-selected') === 'true',
  );

  let elementIndex = 0;
  const element = currentOpts.find((option, index) => {
    const isInteractable = option.getAttribute('aria-disabled') !== 'true';
    let isFirstNavigableOption;

    if (
      hasSelectedOptions
      && props.autoSelection === AutoSelection.FirstSelected
    ) {
      const isSelected = option.getAttribute('aria-selected') === 'true';
      isFirstNavigableOption = isSelected && isInteractable;
    } else {
      isFirstNavigableOption = isInteractable;
    }

    if (isFirstNavigableOption) {elementIndex = index;}

    return isFirstNavigableOption;
  });

  if (!element) {
    return;
  }

  return {element, index: elementIndex};
};

const handleScrollIntoView = (option: NavigableOption): void => {
  if (scrollableRef.value) {
    scrollOptionIntoView(option.element, scrollableRef.value);
  }
};

const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);

const handleKeyToBottom = (): void | Promise<void> => {
  if (onKeyToBottom) {
    lazyLoading.value = true;
    return Promise.resolve(onKeyToBottom());
  }
};

const handleChangeActiveOption = (
  nextOption?: NavigableOption,
): void | Record<string, any> => {
  if (!nextOption) {
    activeOption = undefined;
  } else {
    activeOption?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
    nextOption?.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
    handleScrollIntoViewDebounced(nextOption);
    activeOption = nextOption;
    setActiveOptionId?.(nextOption.domId);

    emits('on-active-option-change', nextOption.value);
  }
};

const getFormattedOption = (
  element: HTMLElement, index: number,
): Record<string, any> => {
  return {
    element,
    index,
    domId: element.id,
    value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || '',
    disabled: element.getAttribute('aria-disabled') === 'true',
    isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === 'true',
  };
};

const resetActiveOption = (): void => {
  let nextOption;
  const nextOptions = getNavigableOptions();
  const nextActiveOption = getFirstNavigableOption(nextOptions);

  if (nextOptions.length === 0 && currentOptions.value.length > 0) {
    currentOptions.value = nextOptions;
    handleChangeActiveOption();
    return;
  }

  if (nextActiveOption) {
    const { element, index } = nextActiveOption as Record<string, any>;
    nextOption = getFormattedOption(element, index);
  }

  const optionIsAlreadyActive =
      activeOption !== undefined && nextOption?.domId === activeOption?.domId;

  const actionContentHasUpdated =
      activeOption?.isAction &&
      nextOption?.isAction &&
      nextOption?.value !== activeOption?.value;

  const currentValues = currentOptions.value.map((option) =>
    option.getAttribute(OPTION_VALUE_ATTRIBUTE),
  );

  const nextValues = nextOptions.map((option) =>
    option.getAttribute(OPTION_VALUE_ATTRIBUTE),
  );

  const listIsUnchanged =
      nextValues.length === currentValues.length &&
      nextValues.every((value, index) => {
        return currentValues[index] === value;
      });

  if (listIsUnchanged) {
    if (optionIsAlreadyActive && actionContentHasUpdated) {
      currentOptions.value = nextOptions
      handleChangeActiveOption(nextOption);
    }

    return;
  }

  currentOptions.value = nextOptions

  if (lazyLoading.value) {
    lazyLoading.value = false;
    return;
  }

  handleChangeActiveOption(nextOption);
};

const getNextValidOption = async (key: ArrowKeys): Promise<Record<string, any>> => {
  const lastIndex = currentOptions.value.length - 1;
  let currentIndex = activeOption?.index || 0;
  let nextIndex = 0;
  let element = activeOption?.element;
  let totalOptions = -1;

  while (totalOptions++ < lastIndex) {
    nextIndex = getNextIndex(currentIndex, lastIndex, key);
    element = currentOptions[nextIndex];
    const triggerLazyLoad = nextIndex >= lastIndex;
    const isDisabled = element?.getAttribute('aria-disabled') === 'true';

    if (triggerLazyLoad && willLoadMoreOptions) {
      await handleKeyToBottom();
    }

    if (isDisabled) {
      currentIndex = nextIndex;
      element = undefined;
      continue;
    }

    break;
  }
  return {element, nextIndex};
};

const handleArrow = async (
  type: ArrowKeys,
  event: KeyboardEvent,
): Promise<void> => {
  event.preventDefault();

  const { element, nextIndex } = await getNextValidOption(type) as Record<string, any>;

  if (!element) {
    return;
  }

  const nextOption = getFormattedOption(element, nextIndex);

  handleChangeActiveOption(nextOption as NavigableOption);
};

const handleDownArrow = (event: KeyboardEvent): void => {
  handleArrow('down', event);
};

const handleUpArrow = (event: KeyboardEvent): void => {
  handleArrow('up', event);
};

const handleEnter = (event: KeyboardEvent): void => {
  event.preventDefault();
  event.stopPropagation();

  if (activeOption) {
    onOptionSelect(activeOption as NavigableOption);
  }
};

const handleFocus = (): void => {
  if (props.enableKeyboardControl) {
    return;
  }

  keyboardEventsEnabled.value = true;
};

const handleBlur = (event: FocusEvent): void => {
  event.stopPropagation();

  if (keyboardEventsEnabled.value) {
    const nextActiveOption = getFirstNavigableOption(currentOptions.value);

    if (nextActiveOption) {
      const { element, index } = nextActiveOption as Record<string, any>;
      const nextOption = getFormattedOption(element, index);

      handleChangeActiveOption(nextOption as NavigableOption);
    }
  }

  if (props.enableKeyboardControl) {
    return;
  }

  keyboardEventsEnabled.value = false;
};

const setLoading = (value: string): void => {
  loading.value = value;
};

const getNextIndex = (
  currentIndex: number,
  lastIndex: number,
  direction: string,
): number => {
  let nextIndex;

  if (direction === 'down') {
    if (currentIndex === lastIndex) {
      nextIndex = willLoadMoreOptions ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex + 1;
    }
  } else {
    nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  return nextIndex;
};

const onOptionSelect = (option: NavigableOption): void => {
  handleChangeActiveOption(option);

  if (onOptionSelected) {
    onOptionSelected();
  }

  emits('select', option.value);
};

provide('listboxContext', { onOptionSelect, setLoading });

onUpdated(() => {
  if (listboxRef.value) {
    scrollableRef.value = listboxRef.value.closest(scrollable.selector);
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/Listbox.scss';
</style>
