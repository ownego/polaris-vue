<template lang="pug">
template(v-if="hasSlot(slots.icon)")
  activator(v-if="isPlainButton || disabled")
  template(v-else)
    Popover(
      autofocusTarget="first-node",
      :active="popoverActive",
      @close="togglePopoverActive",
    )
      template(#activator)
        activator
      div(:class="styles.ActionListWrap")
        ActionList(
          actionRole="menuitem",
          :items="formattedActions",
        )
    RenameModal(
      v-if="renameAction",
      :name="content",
      :open="activeModalType === 'rename'",
      :isModalLoading="isModalLoading",
      :viewNames="viewNames",
      @close="handleModalClose",
      @click-primary-action="handleSaveRenameModal",
    )
    div {{ i18n.translate('Polaris.Tabs.Tab.copy', { name: content }) }}
    DuplicateModal(
      v-if="duplicateAction",
      :open="activeModalType === 'duplicate'",
      :name="i18n.translate('Polaris.Tabs.Tab.copy', { name: content })",
      :isModalLoading="isModalLoading",
      :viewNames="viewNames || []",
      @close="handleModalClose",
      @click-primary-action="handleSaveDuplicateModal",
    )
    Modal(
      v-if="deleteAction",
      :open="activeModalType === 'delete'",
      :primaryAction=`{
        content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
        destructive: true,
        disabled: isModalLoading,
        onAction: handleConfirmDeleteView,
      }`,
      :secondaryActions=`[{
        content: i18n.translate('Polaris.Tabs.Tab.deleteModal.cancel'),
        onAction: handleModalClose,
      }]`,
      @close="handleModalClose",
    )
      template(#title) {{ i18n.translate('Polaris.Tabs.Tab.deleteModal.title') }}
      ModalSection {{ i18n.translate('Polaris.Tabs.Tab.deleteModal.description',
        | { viewName: content }) }}
li(
  v-else,
  ref="nodeRef",
  role="presentation",
  :class="tabContainerClassNames",
)
  activator(v-if="isPlainButton || disabled")
  template(v-else)
    Popover(
      autofocusTarget="first-node",
      :active="popoverActive",
      :z-index-override="disclosureZIndexOverride",
      @close="togglePopoverActive",
    )
      template(#activator)
        activator
      div(:class="styles.ActionListWrap")
        ActionList(
          actionRole="menuitem",
          :items="formattedActions",
        )
    RenameModal(
      v-if="renameAction",
      :name="content",
      :open="activeModalType === 'rename'",
      :isModalLoading="isModalLoading",
      :viewNames="viewNames",
      @close="handleModalClose",
      @click-primary-action="handleSaveRenameModal",
    )
    DuplicateModal(
      v-if="duplicateAction",
      :open="activeModalType === 'duplicate'",
      :name="i18n.translate('Polaris.Tabs.Tab.copy', { name: content })",
      :isModalLoading="isModalLoading",
      :viewNames="viewNames || []",
      @close="handleModalClose",
      @click-primary-action="handleSaveDuplicateModal",
    )
    Modal(
      v-if="deleteAction",
      :open="activeModalType === 'delete'",
      :primaryAction=`{
        content: i18n.translate('Polaris.Tabs.Tab.deleteModal.delete'),
        destructive: true,
        disabled: isModalLoading,
        onAction: handleConfirmDeleteView,
      }`,
      :secondaryActions=`[{
        content: i18n.translate('Polaris.Tabs.Tab.deleteModal.cancel'),
        onAction: handleModalClose,
      }]`,
      @close="handleModalClose",
    )
      template(#title) {{ i18n.translate('Polaris.Tabs.Tab.deleteModal.title') }}
      ModalSection
        | {{ i18n.translate('Polaris.Tabs.Tab.deleteModal.description', { viewName: content }) }}
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  getCurrentInstance,
  watch,
  h,
} from 'vue';
import useI18n from '@/use/useI18n';
import { focusFirstFocusableNode, handleMouseUpByBlurring } from '@/utilities/focus';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import { Popover, ActionList, Modal, ModalSection, InlineStack, UnstyledButton, UnstyledLink, Icon, Text, Badge } from '@/components';
import styles from '@polaris/components/Tabs/Tabs.module.css';
import InfoIcon from '@icons/InfoIcon.svg';
import DuplicateIcon from '@icons/DuplicateIcon.svg';
import EditIcon from '@icons/EditIcon.svg';
import LayoutColumns3Icon from '@icons/LayoutColumns3Icon.svg';
import DeleteIcon from '@icons/DeleteIcon.svg';
import ChevronDownIcon from '@icons/ChevronDownIcon.svg';
import { DuplicateModal, RenameModal } from './components';
import type { TabAction, TabEvents, TabProps, TabSlots } from '../../types';

const props = defineProps<TabProps>();
const slots = defineSlots<TabSlots>();
const emits = defineEmits<TabEvents & {
  'tab-action': [],
}>();

const i18n = useI18n();
const currentInstance = getCurrentInstance();
const { hasSlot } = useHasSlot();

const popoverActive = ref<boolean>(false);
const activeModalType = ref<TabAction | null>(null);
const wasSelected = ref(props.selected);
const panelFocused = ref<boolean>(false);
const nodeRef = ref<HTMLLIElement | null>(null);

const hasTogglePopover = computed(() => Boolean(currentInstance?.vnode.props?.onTogglePopover));
const hasToggleModal = computed(() => Boolean(currentInstance?.vnode.props?.onTogglerModal));

const tabIndex = computed(() => {
  if (props.tabIndexOverride != null) {
    return props.tabIndexOverride;
  }

  if (props.selected && !props.siblingTabHasFocus && !props.measuring) {
    return 0;
  } else if (props.focused && !props.measuring) {
    return 0;
  }

  return -1;
});

const renameAction = computed(() =>
  props.actions?.find((action) => action.type === 'rename')
);

const duplicateAction = computed(() => props.actions?.find(
  (action) => action.type === 'duplicate'),
);

const deleteAction = computed(() => props.actions?.find(
  (action) => action.type === 'delete'),
);

const actionContent = computed(() => ({
  rename: {
    icon: InfoIcon,
    content: i18n.translate('Polaris.Tabs.Tab.rename'),
  },
  duplicate: {
    icon: DuplicateIcon,
    content: i18n.translate('Polaris.Tabs.Tab.duplicate'),
  },
  edit: {
    icon: EditIcon,
    content: i18n.translate('Polaris.Tabs.Tab.edit'),
  },
  'edit-columns': {
    icon: LayoutColumns3Icon,
    content: i18n.translate('Polaris.Tabs.Tab.editColumns'),
  },
  delete: {
    icon: DeleteIcon,
    content: i18n.translate('Polaris.Tabs.Tab.delete'),
    destructive: true,
  },
}));

const formattedActions = computed(() => props.actions?.map(
  ({ type, onAction, onPrimaryAction, ...additionalOptions }) => {
    const isModalActivator = !type.includes('edit');

    return {
      ...actionContent.value[type],
      ...additionalOptions,
      onAction: () => {
        onAction?.(props.content);
        togglePopoverActive();
        if (isModalActivator) {
          handleModalOpen(type);
        }
      },
    };
  },
));

const tabContainerClassNames = computed(() => classNames(
  styles.TabContainer,
  props.selected && styles.Underline,
));

const urlIfNotDisabledOrSelected = computed(() =>
  props.disabled || props.selected ? undefined : props.url,
);

const tabClassName = computed(() => classNames(
  styles.Tab,
  hasSlot(slots.icon) && styles['Tab-iconOnly'],
  popoverActive.value && styles['Tab-popoverActive'],
  props.selected && styles['Tab-active'],
  props.selected && props.actions?.length && styles['Tab-hasActions'],
));

const isPlainButton = computed(() => !props.selected || !props.actions?.length);

const focusPanelID = (panelID: string) => {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({ preventScroll: true });
  }
};

const togglePopoverActive = () => {
  if (!props.actions?.length) {
    return;
  }
  popoverActive.value = !popoverActive.value;
};

const handleClick = () => {
  if (props.disabled) {
    return;
  }
  if (props.selected) {
    togglePopoverActive();
  } else {
    emits('tab-action');
  }
};

const handleModalOpen = (type: TabAction) => {
  activeModalType.value = type;
};

const handleModalClose = () => {
  activeModalType.value = null;
};

const handleSaveRenameModal = async (value: string) => {
  await renameAction.value?.onPrimaryAction?.(value);

  setTimeout(() => {
    if (nodeRef.value) {
      focusFirstFocusableNode(nodeRef.value);
    }
  }, 250);
};

const handleConfirmDeleteView = async () => {
  await deleteAction.value?.onPrimaryAction?.(props.content);
  handleModalClose();
}

const handleSaveDuplicateModal = async (duplicateName: string) => {
  await duplicateAction.value?.onPrimaryAction?.(duplicateName);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};

const activator = () => {
  return h(
    urlIfNotDisabledOrSelected.value
      ? UnstyledLink
      : UnstyledButton,
    {
      id: props.id,
      className: tabClassName.value,
      tabIndex: tabIndex,
      'aria-selected': props.selected,
      'aria-controls': props.panelID,
      'aria-label': props.accessibilityLabel,
      role: props.tabIndexOverride == null ? 'tab' : undefined,
      disabled: props.disabled,
      url: urlIfNotDisabledOrSelected.value,
      onFocus: () => emits('focus'),
      onMouseUp: handleMouseUpByBlurring,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
    },
    () => [
      h(
        InlineStack,
        {
          gap: '200',
          align: 'center',
          blockAlign: 'center',
          wrap: false,
        },
        () => [
          h(
            Text,
            {
              as: 'span',
              variant: 'bodySm',
              fontWeight: 'medium',
            },
            {
              default: () => hasSlot(slots.icon) ? slots.icon() : props.content,
            },
          ),
          props.badge ? h(
            Badge,
            { tone: props.selected ? undefined : 'new' },
            { default: () => props.badge },
          ) : null,
        ],
      ),
      props.selected && props.actions?.length ? h(
        'div',
        { class: classNames(styles.IconWrap) },
        h(Icon, { source: ChevronDownIcon }),
      ) : null,
    ],
  );
}

watch(
  () => [popoverActive.value, hasTogglePopover.value],
  () => {
    emits('toggle-popover', popoverActive.value);
  },
);

watch(
  () => [activeModalType.value, hasToggleModal.value],
  () => {
    emits('toggle-modal', Boolean(activeModalType.value));
  },
);

watch(
  () => [hasTogglePopover.value, hasToggleModal.value],
  () => {
    return () => {
      emits('toggle-popover', false);
      emits('toggle-modal', false);
    };
  },
);

// A tab can start selected when it is moved from the disclosure dropdown into the main list,
// so we need to send focus from the tab to the panel on mount and update
watch(
  () => [
    props.focused,
    props.id,
    props.content,
    props.measuring,
    props.panelID,
    props.selected,
    props.disabled,
    activeModalType.value,
  ],
  () => {
    if (props.measuring) {
      return;
    }

    // Because of timing issues with the render, we may still have the old,
    // in-disclosure version of the tab that has focus. Check for this as a second indicator of focus
    const itemHadFocus =
      props.focused || (document.activeElement && document.activeElement.id === props.id);

    // If we just check for selected, the panel for the active tab will be focused on page load, which we don’t want
    if (
      itemHadFocus &&
      props.selected &&
      props.panelID != null &&
      !panelFocused.value
    ) {
      focusPanelID(props.panelID);
      panelFocused.value = true;
    }

    if (props.selected && !wasSelected.value && props.panelID != null) {
      focusPanelID(props.panelID);
    } else if (
      props.focused &&
      nodeRef.value != null &&
      activeModalType == null &&
      !props.disabled
    ) {
      focusFirstFocusableNode(nodeRef.value);
    }

    wasSelected.value = props.selected;
  },
  { immediate: true },
);
</script>
