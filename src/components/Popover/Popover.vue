<template lang="pug">
// TODO: Update lazy loaded docs
component(
  :is="activatorWrapper",
  ref="container"
)
  slot(name="activator")
  Portal(v-if="activator && active", idPrefix="popover")
    PopoverOverlay(
      :id="id",
      :activator="activator",
      :fullWidth="fullWidth",
      :active="active",
      :preferInputActivator="preferInputActivator",
      :fixed="fixed",
      :preferredPosition="preferredPosition",
      :preferredAlignment="preferredAlignment",
      :zIndexOverride="zIndexOverride",
      :autofocusTarget="autofocusTarget",
      :sectioned="sectioned",
      :colorScheme="colorScheme",
      @close="handleClose",
      @scrolled-to-bottom="emit('scrolled-to-bottom')",
    )
      template(v-slot:overlay="props")
        slot(name="content")
      //- slot(name="extra-content", slot="extra-content")
</template>

<script setup lang="ts">
import {
  watch, ref, onMounted, withDefaults,
} from 'vue';
import { portal } from 'polaris-react/src/components/shared';
import {
  findFirstFocusableNodeIncludingDisabled,
  focusNextFocusableNode,
} from '@/utilities/focus';
import { UseUniqueId } from '@/use';
import {
  PopoverCloseSource, setActivatorAttributes, PopoverProps,
} from './utils';
import { PopoverOverlay } from './components';
import { Portal } from '../Portal';

const props = withDefaults(defineProps<PopoverProps>(), {
  activatorWrapper: 'div',
  preferInputActivator: true,
  autofocusTarget: 'container',
});
const emit = defineEmits<{(event: 'close', source: PopoverCloseSource): void,
  (event: 'scrolled-to-bottom'): void}
  >();
const container = ref<HTMLElement | null>(null);
const activator = ref<HTMLElement | null>(null);
const { useUniqueId } = UseUniqueId();
const id = ref<string>(useUniqueId('popover'));

const setAccessibilityAttributes = () => {
  if (container.value) {
    const containerNode = container.value;
    const firstFocusable = findFirstFocusableNodeIncludingDisabled(containerNode);
    const focusableActivator: HTMLElement & { disabled?: boolean; } = firstFocusable
      || containerNode;
    const activatorDisabled = 'disabled' in focusableActivator && Boolean(focusableActivator.disabled);

    setActivatorAttributes(focusableActivator, {
      id: id.value,
      active: props.active,
      ariaHaspopup: props.ariaHaspopup as string,
      activatorDisabled,
    });
  }
};

watch(() => props.active, () => setAccessibilityAttributes());

const isInPortal = (element: Element) => {
  let { parentElement } = element;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) return false;
    parentElement = parentElement.parentElement;
  }

  return true;
};

const handleClose = (source: PopoverCloseSource) => {
  emit('close', source);
  if (!container.value || props.preventFocusOnClose) return;

  if ((source === PopoverCloseSource.FocusOut || source === PopoverCloseSource.EscapeKeypress)
    && activator.value
  ) {
    const focusableActivator = findFirstFocusableNodeIncludingDisabled(activator.value)
      || findFirstFocusableNodeIncludingDisabled(container.value)
      || container.value;
    if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
      focusableActivator.focus();
    }
  }
};

onMounted(() => {
  if (container.value) {
    const activatorNode = container.value.firstElementChild;
    if (activatorNode) activator.value = activatorNode as HTMLElement;
    setAccessibilityAttributes();
  }
});
</script>

<style lang="scss">
@import 'polaris-react/src/components/Popover/Popover.scss';
</style>
