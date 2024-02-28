<template lang="pug">
li(:class="listItemClassName", :dataHref="dataHref")
  div(:class="styles.ItemWrapper")
    div(
      ref="node",
      :class="className",
      @click="disabled ? () => {} : handleClick",
      @focus="handleFocus",
      @blur="handleBlur",
      @keyup="handleKeyUp",
      @mouseout="handleMouseOut",
      :data-href="url",
    )
      template(v-if="!disabled")
        UnstyledLink(
          v-if="url",
          :aria-describedby="id",
          :aria-label="ariaLabel",
          :class="styles.Link",
          :url="url",
          :external="external",
          :tabIndex="tabIndex",
          :id="overlayId",
        )
        button(
          v-else,
          :class="styles.Button",
          :aria-label="ariaLabel",
          :aria-controls="ariaControls",
          :aria-expanded="ariaExpanded",
          @click="handleClick",
          :tabIndex="tabIndex",
          ref="buttonOverlay",
        )
      Box(
        :id="id",
        position="relative",
        padding-inline-start="300",
        padding-inline-end="300",
        padding-block-start="300",
        padding-block-end="300",
      )
        InlineGrid(:columns="{ xs: '1fr auto' }")
          InlineGrid(
            :columns="{ xs: hasSlot(slots.media) || isSelectable ? 'auto 1fr' : '1fr' }",
            gap="300",
          )
            InlineStack(
              v-if="hasSlot(slots.media) || isSelectable",
              gap="300",
              :block-align="hasSlot(slots.media) || isSelectable ? 'center' : getAlignment(verticalAlignment)",
            )
              div(
                v-if="selectable",
                :class="styles.CheckboxWrapper"
                @click="stopPropagation",
                @change="handleLargerSelectionArea",
              )
                Checkbox(
                  v-model="selected",
                  labelHidden,
                  fill,
                  :label="checkboxAccessibilityLabel",
                  :disabled="loading || disabled",
                  :label-class-name="styles.CheckboxLabel",
                  bleed-inline-start="300",
                  bleed-inline-end="300",
                  bleed-block-start="300",
                  bleed-block-end="300",
                )
              div(v-if="hasSlot(slots.media)")
                slot(name="media")
            InlineStack(:block-align="getAlignment(verticalAlignment)")
              Box(width="100%", padding="0")
                slot
          //-ActionsMarkup
          template(v-if="shortcutActions && !loading")
            template(
              v-if="persistActions",
            )
              div(
                v-if="breakpoints?.lgUp",
                :Class="styles.Actions",
                @click="stopPropagation",
              )
                ButtonGroup
                  ButtonFrom(
                    v-for="action, index in shortcutActions",
                    :key="String(index)",
                    :action="action",
                    :overrides="{ variant: 'tertiary' }",
                  )
            template(v-else)
              div(
                v-if="breakpoints?.lgUp",
                :Class="styles.Actions",
                @click="stopPropagation",
              )
                Box(position="absolute", inset-block-start="400", insert-inline-end="500")
                  ButtonGroup(variant="segmented")
                    ButtonFrom(
                      v-for="action, index in shortcutActions",
                      :key="String(index)",
                      :action="action",
                      :overrides="{ size: 'slim' }",
                    )
          //-DisclosureMarkup
          template(v-if="shortcutActions && !loading")
            template(
              v-if="persistActions",
            )
              div(
                v-if="!selectMode && breakpoints?.lgDown",
                @click="stopPropagation",
              )
                Popover(
                  :active="actionsMenuVisible",
                  @close="handleCloseRequest",
                )
                  template(#activator)
                    Button(
                      variant="tertiary",
                      :accessibilityLabel="disclosureAccessibilityLabel",
                      :icon="MenuHorizontalIcon",
                      @click="handleActionsClick",
                    )
                  ActionList(:items="shortcutActions")
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots, watch } from 'vue';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import useId from '@/use/useId';
import {
  Box,
  ActionList,
  Popover,
  UnstyledLink,
  ButtonGroup,
  Checkbox,
  Button,
  ButtonFrom,
  InlineGrid,
  InlineStack,
} from '@/components';
import { useBreakpoints } from '@/utilities/breakpoints';
import type { DisableableAction } from '@/utilities/types';
import { SELECT_ALL_ITEMS } from '@polaris/utilities/resource-list';
import type { ResourceListSelectedItems, ResourceListContextType } from '@/utilities/types';
import type { InlineStackProps } from '../InlineStack/types';
import styles from '@polaris/components/ResourceItem/ResourceItem.module.scss';
import MenuHorizontalIcon from '@icons/MenuHorizontalIcon.svg';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface ResourceItemProps {
  /** Whether or not interaction is disabled */
  disabled?: boolean;
  /** Visually hidden text for screen readers used for item link*/
  accessibilityLabel?: string;
  /** Individual item name used by various text labels */
  name?: string;
  /** Id of the element the item onClick controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /** Unique identifier for the item */
  id: string;
  /** Makes the shortcut actions always visible */
  persistActions?: boolean;
  /** 1 or 2 shortcut actions; must be available on the page linked to by url */
  shortcutActions?: DisableableAction[];
  /** The order the item is rendered */
  sortOrder?: number;
  /** URL for the resource’s details page (required unless onClick is provided) */
  url?: string;
  /** Allows url to open in a new tab */
  external?: boolean;
  /** Adjust vertical alignment of elements */
  verticalAlignment?: Alignment;
  /** Prefetched url attribute to bind to the main element being returned */
  dataHref?: string;
}

const props = withDefaults(defineProps<ResourceItemProps>(), {
  persistActions: false,
});

const emits = defineEmits<{
  (e: 'click', id: string): void;
}>();

const slots = useSlots();
const i18n = useI18n();
const { hasSlot } = useHasSlot();
const breakpoints = useBreakpoints();

const {
  selectedItems,
  selectable,
  selectMode,
  loading,
  resourceName,
  onSelectionChange,
} = inject('resource-list-context', {}) as ResourceListContextType;

const actionsMenuVisible = ref(false);
const focused = ref(false);
const focusedInner = ref(false);
const selected = ref(isSelected(props.id, selectedItems?.value));

const overlayId = useId();
const node = ref<HTMLDivElement | null>(null);
const buttonOverlay = ref<HTMLButtonElement | null>(null);

const isSelectable = computed(() => selectable);

const className = computed(() => classNames(
  styles.ResourceItem,
  focused.value && styles.focused,
  isSelectable.value && styles.selectable,
  selected.value && styles.selected,
  selectMode && styles.selectMode,
  props.persistActions && styles.persistActions,
  focusedInner.value && styles.focusedInner,
));

const listItemClassName = computed(() => classNames(
  styles.ListItem,
  focused.value && !focusedInner.value && styles.focused,
));

const disclosureAccessibilityLabel = computed(() => props.name
  ? i18n.translate('Polaris.ResourceList.Item.actionsDropdownLabel', {
    accessibilityLabel: props.name,
  })
  : i18n.translate('Polaris.ResourceList.Item.actionsDropdown'),
);

const checkboxAccessibilityLabel = computed(() => {
  return props.name || props.accessibilityLabel || i18n.translate('Polaris.Common.checkbox');
});

const tabIndex = computed(() => loading ? -1 : 0);

const ariaLabel = computed(() => {
  return props.accessibilityLabel ||
  i18n.translate('Polaris.ResourceList.Item.viewItem', {
    itemName: props.name || (resourceName && resourceName.singular) || '',
  });
});

watch(
  () => selectedItems?.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      selected.value = isSelected(props.id, newVal);
    }
  },
);

const handleFocus = (event: Event) => {
  if (
    event.target === buttonOverlay.value ||
    (node.value && event.target === node.value.querySelector(`#${overlayId}`))
  ) {
    focused.value = true;
    focusedInner.value = false;
  } else if (node.value && node.value.contains(event.target as HTMLElement)) {
    focused.value = true;
    focusedInner.value = true;
  }
};

const handleBlur = (event: Event) => {
  const { relatedTarget } = event as FocusEvent;
  if (
    node.value &&
    relatedTarget instanceof Element &&
    node.value.contains(relatedTarget)
  ) {
    return;
  }

  focused.value = false;
  focusedInner.value = false;
};

const handleMouseOut = () => {
  if (focused.value) {
    focused.value = false;
    focusedInner.value = false;
  }
};

const handleLargerSelectionArea = (event: Event) => {
  event.stopPropagation();
  const e = event as MouseEvent;
  handleSelection(!selected.value, e.shiftKey);
};

const handleSelection = (value: boolean, shiftKey: boolean) => {
  const {
    id,
    sortOrder,
  } = props;

  if (!id || !onSelectionChange) {
    return;
  }

  focused.value = value;
  focusedInner.value = value;

  onSelectionChange(!value, id, sortOrder, shiftKey);
};

const handleClick = (event: MouseEvent) => {
  event.stopPropagation();
  const { id, url } = props;

  const { ctrlKey, metaKey } = event;
  const anchor = node.value && node.value.querySelector('a');

  if (selectMode) {
    handleLargerSelectionArea(event);
    return;
  }

  if (anchor === event.target) {
    return;
  }

  emits('click', id);

  if (url && (ctrlKey || metaKey)) {
    window.open(url, '_blank');
    return;
  }

  if (url && anchor) {
    anchor.click();
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  const { key } = event;

  if (key === 'Enter' && props.url && !selectMode && !props.disabled) {
    emits('click', props.id);
  }
};

const handleActionsClick = () => {
  actionsMenuVisible.value = !actionsMenuVisible.value;
};

const handleCloseRequest = () => {
  actionsMenuVisible.value = false;
};

const stopPropagation = (e: Event) => {
  e.stopPropagation();
};

function isSelected(id: string, tmpSelectedItems?: ResourceListSelectedItems) {
  return Boolean(
    tmpSelectedItems &&
      ((Array.isArray(tmpSelectedItems) && tmpSelectedItems.includes(id)) ||
        tmpSelectedItems === SELECT_ALL_ITEMS),
  );
}

function getAlignment(alignment?: Alignment): InlineStackProps['blockAlign'] {
  switch (alignment) {
    case 'leading':
      return 'start';
    case 'trailing':
      return 'end';
    case 'center':
      return 'center';
    case 'fill':
      return 'stretch';
    case 'baseline':
      return 'baseline';
    default:
      return 'start';
  }
}
</script>
