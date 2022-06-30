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
  onUpdated,
  useSlots,
  withDefaults,
  onMounted,
} from 'vue';
import { debounce } from 'polaris/polaris-react/src/utilities/debounce';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { scrollable } from 'polaris/polaris-react/src/components/shared';
import { scrollOptionIntoView } from 'polaris/polaris-react/src/utilities/listbox/utilities';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Listbox.json';
import type { ComboboxListboxType, NavigableOption } from '@/utilities/interface';
import { KeypressListener, VisuallyHidden } from '@/components';
import { Key } from '../KeypressListener/utils';
import { AutoSelection } from './utils';

type ArrowKeys = 'up' | 'down';

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
const listId = computed(() => props.customListId || useUniqueId('Listbox'));

const inCombobox = computed(() => Boolean(setActiveOptionId));

const listboxRef = ref<HTMLUListElement | null>(null);
const scrollableRef = ref<HTMLElement | null>(null);

const loading = ref('');
const lazyLoading = ref(false);
const currentOptions = ref<HTMLElement[]>([]);
const keyboardEventsEnabled = ref(Boolean(props.enableKeyboardControl));

const activeOption = ref<NavigableOption | undefined>();

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
    activeOption.value = undefined;
  } else {
    activeOption.value?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
    nextOption?.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, 'true');
    handleScrollIntoViewDebounced(nextOption);
    activeOption.value = nextOption;
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
      activeOption.value !== undefined && nextOption?.domId === activeOption.value?.domId;

  const actionContentHasUpdated =
      activeOption.value?.isAction &&
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
      currentOptions.value = nextOptions;
      handleChangeActiveOption(nextOption);
    }

    return;
  }

  const listIsAppended =
    currentValues.length !== 0 &&
    nextValues.length > currentValues.length &&
    currentValues.every((value, index) => {
      return nextValues[index] === value;
    });

  if (listIsAppended) {
    currentOptions.value = nextOptions;
    return;
  }

  currentOptions.value = nextOptions;

  if (lazyLoading.value) {
    lazyLoading.value = false;
    return;
  }
  handleChangeActiveOption(nextOption);
};

const getNextValidOption = async (key: ArrowKeys): Promise<Record<string, any>> => {
  const lastIndex = currentOptions.value.length - 1;
  let currentIndex = activeOption.value?.index || 0;
  let nextIndex = 0;
  let element = activeOption.value?.element;
  let totalOptions = -1;

  if (!activeOption.value && props.autoSelection === AutoSelection.None) {
    const nextOptions = getNavigableOptions();
    const nextActiveOption = getFirstNavigableOption(nextOptions);
    currentOptions.value = nextOptions;

    const {
      tmpElement,
      index,
    } = nextActiveOption as Record<string, any>;

    return {
      element: tmpElement,
      nextIndex: index || 0,
    };
  }

  while (totalOptions++ < lastIndex) {
    nextIndex = getNextIndex(currentIndex, lastIndex, key);
    element = currentOptions.value[nextIndex];
    const triggerLazyLoad = nextIndex >= lastIndex;
    const isDisabled = element?.getAttribute('aria-disabled') === 'true';

    if (triggerLazyLoad && willLoadMoreOptions?.value) {
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

  if (activeOption.value) {
    onOptionSelect(activeOption.value as NavigableOption);
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
      nextIndex = willLoadMoreOptions?.value ? currentIndex + 1 : 0;
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
provide('withinListboxContext', true);

onUpdated(() => {
  if (listboxRef.value) {
    scrollableRef.value = listboxRef.value.closest(scrollable.selector);
  }
});

onMounted(() => {
  if (
    props.autoSelection !== AutoSelection.None
    && !loading.value
    && slots.default
    && slots.default().length > 0
  ) {
    resetActiveOption();
  }

  if (props.enableKeyboardControl && !keyboardEventsEnabled.value) {
    keyboardEventsEnabled.value = true;
  }

  if (setListboxId && !listboxId?.value) {
    setListboxId(listId.value);
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Listbox/Listbox.scss';
</style>
