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
    :id="listId",
    @focus="handleFocus",
    @blur="handleBlur",
    ref="listboxRef",
  )
    slot
</template>

<script setup lang="ts">
import {
  provide, inject, ref, computed, watch, onMounted,
} from 'vue';
import debounce from 'lodash/debounce';
import { classNames } from 'polaris-react/src/utilities/css';
import { scrollIntoView } from 'polaris-react/src/utilities/scroll-into-view';
import { scrollable } from 'polaris-react/src/components/shared';
import { closestParentMatch } from 'polaris-react/src/utilities/closest-parent-match';
import {
  listboxSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Listbox.json';
import type { ComboboxListboxType, NavigableOption } from '@/utilities/interface';
import { KeypressListener } from '../KeypressListener';
import { Key } from '../KeypressListener/utils';
import { VisuallyHidden } from '../VisuallyHidden';

export type ArrowKeys = 'up' | 'down';

const LISTBOX_OPTION_SELECTOR = '[data-listbox-option]';
const LISTBOX_OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';

const DATA_ATTRIBUTE = 'data-focused';
const ARIA_ATTRIBUTE = 'aria-activedescendant';

interface ListboxProps {
  /** Explicitly enable keyboard control */
  enableKeyboardControl?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
}

provide('withinListboxContext', true);

const comboboxListboxContext = inject<ComboboxListboxType>('comboboxListboxContext', {});

const {
  setActiveOptionId,
  setListboxId,
  listboxId,
  textFieldLabelId,
  onOptionSelected,
  onKeyToBottom,
  textFieldFocused,
} = comboboxListboxContext;

const props = defineProps<ListboxProps>();

const emits = defineEmits<{
  (event: 'select', value: string): void
}>();

const { useUniqueId  } = UseUniqueId();
const listId = useUniqueId('Listbox');

const inCombobox = computed(() => Boolean(setActiveOptionId));
const listBoxId = computed(() => listboxId || '');

const listboxRef = ref<HTMLUListElement | null>(null);
const scrollableRef = ref<HTMLElement | null>(null);

const loading = ref('');
const keyboardEventsEnabled = ref(props.enableKeyboardControl);

let currentActiveOption: NavigableOption;

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
)

watch(
  () => currentActiveOption,
  () => {
    if (setActiveOptionId) {
      setActiveOptionId(currentActiveOption.domId);
    }
  },
)

const getNavigableOptions = (): HTMLElement[] => {
  const temporaryArray = listboxRef.value?.querySelectorAll<HTMLElement>(LISTBOX_OPTION_SELECTOR);

  return temporaryArray
    ? [...new Set(Array.from(temporaryArray))]
    : [];
};

const handleScrollIntoView = (option: NavigableOption, first: boolean): void => {
  debounce(() => {
    if (scrollableRef.value) {
      const { element } = option;
      const focusTarget = first
        ? closestParentMatch(element, listboxSectionDataSelector.selector)
            || element
        : element;

      scrollIntoView(focusTarget, scrollableRef.value);
    }
  }, 15);
};

const handleChangeActiveOption = (nextOption?: NavigableOption): void => {
  if (currentActiveOption && currentActiveOption.element) {
    currentActiveOption.element.removeAttribute(DATA_ATTRIBUTE);
  }

  if (nextOption) {
    nextOption.element.setAttribute(DATA_ATTRIBUTE, 'true');

    listboxRef.value?.setAttribute(ARIA_ATTRIBUTE, nextOption.domId);

    if (scrollableRef.value) {
      const first = getNavigableOptions().findIndex(
        (element) => element.id === nextOption.element.id,
      ) === 0;

      handleScrollIntoView(nextOption, first);
    }

    currentActiveOption = nextOption;
  }
};

const findNextValidOption = (type: ArrowKeys): HTMLElement | null => {
  const isUp = type === 'up';
  const navItems = getNavigableOptions();
  let nextElement: HTMLElement | null | undefined = currentActiveOption.element;
  let count = -1;

  while (count++ < navItems.length) {
    let nextIndex: number;

    if (nextElement) {
      const currentId = nextElement?.id;
      const currentIndex = navItems.findIndex(
        (currentNavItem) => currentNavItem.id === currentId,
      );
      let increment = isUp ? -1 : 1;

      if (currentIndex === 0 && isUp) {
        increment = navItems.length - 1;
      } else if (currentIndex === navItems.length - 1 && !isUp) {
        increment = -(navItems.length - 1);
      }

      nextIndex = currentIndex + increment;
      nextElement = navItems[nextIndex];
    } else {
      nextIndex = isUp ? navItems.length - 1 : 0;
      nextElement = navItems[nextIndex] ;
    }

    if (nextElement?.getAttribute('aria-disabled') === 'true') {
      continue;
    }

    if (nextIndex === navItems.length - 1 && onKeyToBottom) {
      onKeyToBottom();
    }

    return nextElement;
  }

  return null;
}

const handleArrow = (type: ArrowKeys, event: KeyboardEvent): void => {
  event.preventDefault();

  const nextValidElement = findNextValidOption(type);

  if (!nextValidElement) {
    return;
  }

  const nextOption = {
    domId: nextValidElement.id,
    value: nextValidElement
      .getAttribute(LISTBOX_OPTION_VALUE_ATTRIBUTE) || '',
    element: nextValidElement,
    disabled: nextValidElement.getAttribute('aria-disabled') === 'true',
  };

  handleChangeActiveOption(nextOption);
}

const handleDownArrow = (event: KeyboardEvent): void => {
  handleArrow('down', event);
};

const handleUpArrow = (event: KeyboardEvent): void => {
  handleArrow('up', event);
};

const onSelect = (value: string): void => {
  emits('select', value);
};

const onOptionSelect = (option: NavigableOption): void => {
  handleChangeActiveOption(option);

  if (onOptionSelected) {
    onOptionSelected();
  }

  onSelect(option.value);
};

const setLoading = (value: string): void => {
  loading.value = value;
};

provide('listboxContext', { onOptionSelect, setLoading });

const handleEnter = (event: KeyboardEvent): void => {
  event.preventDefault();
  event.stopPropagation();

  onOptionSelect(currentActiveOption);
};

const handleFocus = () => {
  if (props.enableKeyboardControl) {
    return;
  }

  keyboardEventsEnabled.value = true;
};

const handleBlur = (event: FocusEvent) => {
  event.stopPropagation();

  if (props.enableKeyboardControl) {
    handleChangeActiveOption();
  }

  if (props.enableKeyboardControl || inCombobox) {
    return;
  }

  keyboardEventsEnabled.value = false;
};

onMounted(() => {
  if (listboxRef.value) {
    scrollableRef.value = listboxRef.value.closest(scrollable.selector);
  }
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/Listbox.scss';
</style>
