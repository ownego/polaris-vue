
<template lang="pug">
li(:class="listItemClassName", :dataHref="dataHref")
  div(:class="styles.ItemWrapper")
    div(
      ref="node",
      :class="className",
      @click="handleClick",
      @focus="handleFocus",
      @blur="handleBlur",
      @keyup="handleKeyUp",
      @mouseout="handleMouseOut",
      :data-href="url",
    )
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
      div(:class="containerClassName", :id="id")
        div(
          v-if="hasSlot(slots.media) || context.selectable",
          :class="ownedClassName",
        )
          div(
            v-if="context.selectable",
            :class="styles.Handle",
            @click="handleLargerSelectionArea",
          )
            div(
              :class="styles.CheckboxWrapper",
              @click="stopPropagation",
            )
              div(@change="handleLargerSelectionArea")
                Checkbox(
                  :id="checkboxId",
                  :label="checkboxAccessibilityLabel",
                  labelHidden,
                  v-model="selected",
                  :disabled="context.loading",
                )
          div(
            v-if="hasSlot(slots.media)",
            :class="styles.Media",
          )
            slot(name="media")
        div(v-if="hasSlot(slots.default)", :class="styles.Content")
          slot
        template(v-if="shortcutActions && !context.loading")
          div(
            v-if="persistActions",
            :class="styles.Actions",
            @click="stopPropagation",
          )
            ButtonGroup
              ButtonFrom(
                v-for="action, index in shortcutActions",
                :key="index",
                :action="action",
                :overrides="{ plain: true }",
              )
          div(
            v-else,
            :class="styles.Actions",
            @click="stopPropagation",
          )
            ButtonGroup(segmented)
              ButtonFrom(
                v-for="action, index in shortcutActions",
                :key="index",
                :action="action",
                :overrides="{ size: 'slim' }",
              )
        div(
          v-if="persistActions",
          :class="styles.Disclosure",
          @click="stopPropagation",
        )
          Popover(
            :active="actionsMenuVisible",
            @close="handleCloseRequest",
          )
            template(#activator)
              Button(
                :accessibilityLabel="disclosureAccessibilityLabel",
                plain,
                :icon="HorizontalDotsMinor",
                @click="handleActionsClick",
              )
            template(#content)
              ActionList(:items="shortcutActions")
</template>

<script setup lang="ts">
import { computed, inject, onUpdated, ref, useSlots, watch } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { UseI18n } from '@/use';
import { hasSlot } from '@/utilities/has-slot';
import { ActionList, Popover, UnstyledLink, ButtonGroup, Checkbox, Button, ButtonFrom } from '@/components';
import type { DisableableAction } from '@/utilities/interface';
import { globalIdGeneratorFactory } from 'polaris/polaris-react/src/utilities/unique-id/unique-id-factory';
import { SELECT_ALL_ITEMS } from '@/utilities/resource-list';
import type { ResourceListSelectedItems, ResourceListContextType } from '@/utilities/resource-list';
import styles from '@/classes/ResourceItem.json';
import HorizontalDotsMinor from '@icons/HorizontalDotsMinor.svg';

type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface BaseProps {
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
  /** Content for the media area at the left of the item, usually an Avatar or Thumbnail */
  // media?: React.ReactElement<AvatarProps | ThumbnailProps>;
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

const props = withDefaults(defineProps<BaseProps>(), {
  persistActions: false,
});

const emits = defineEmits<{
  (e: 'click', id: string): void;
}>();

const slots = useSlots();
const i18n = UseI18n();

const getUniqueCheckboxID = globalIdGeneratorFactory('ResourceListItemCheckbox');
const getUniqueOverlayID = globalIdGeneratorFactory('ResourceListItemOverlay');

const context = inject('ResourceListContext', {}) as ResourceListContextType;

const actionsMenuVisible = ref(false);
const focused = ref(false);
const focusedInner = ref(false);
const selected = ref(isSelected(props.id, context.selectedItems?.value));

const checkboxId = getUniqueCheckboxID();
const overlayId = getUniqueOverlayID();
const node = ref<HTMLDivElement | null>(null);
const buttonOverlay = ref<HTMLButtonElement | null>(null);

const className = computed(() => classNames(
  styles.ResourceItem,
  focused.value && styles.focused,
  context.selectable?.value && styles.selectable,
  selected.value && styles.selected,
  context.selectMode?.value && styles.selectMode,
  props.persistActions && styles.persistActions,
  focusedInner.value && styles.focusedInner,
));

const listItemClassName = computed(() => classNames(
  styles.ListItem,
  focused.value && !focusedInner.value && styles.focused,
));

const ownedClassName = computed(() => classNames(
  styles.Owned,
  !hasSlot(slots.media) && styles.OwnedNoMedia,
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

const containerClassName = computed(() => classNames(
  styles.Container,
  props.verticalAlignment &&
    styles[variationName('alignment', props.verticalAlignment)],
));

const tabIndex = computed(() => context.loading ? -1 : 0);

const ariaLabel = computed(() => {
  return props.accessibilityLabel ||
  i18n.translate('Polaris.ResourceList.Item.viewItem', {
    itemName: props.name || (context.resourceName && context.resourceName.singular) || '',
  });
});

watch(
  () => context.selectedItems?.value,
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
  handleSelection(selected.value, e.shiftKey);
};

const handleSelection = (value: boolean, shiftKey: boolean) => {
  const {
    id,
    sortOrder,
  } = props;

  if (!id || !context.onSelectionChange) {
    return;
  }

  focused.value = value;
  focusedInner.value = value;

  context.onSelectionChange(value, id, sortOrder, shiftKey);
};

const handleClick = (event: MouseEvent) => {
  event.stopPropagation();
  const { id, url } = props;

  const { ctrlKey, metaKey } = event;
  const anchor = node.value && node.value.querySelector('a');

  if (context.selectMode) {
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

  if (key === 'Enter' && props.url && !context.selectMode) {
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

function isSelected(id: string, selectedItems?: ResourceListSelectedItems) {
  return Boolean(
    selectedItems &&
      ((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
        selectedItems === SELECT_ALL_ITEMS),
  );
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/ResourceItem/ResourceItem.scss';
</style>
