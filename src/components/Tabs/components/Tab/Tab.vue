<template lang="pug">
li(
  :class="tabContainerClassName",
  ref="tabNode",
  role="presentation",
)
  UnstyledLink(
    v-if="url",
    :id="id",
    :url="url",
    role="tab",
    :tabIndex="tabIndex",
    :class="className",
    :aria-selected="selected",
    :aria-controls="panelID",
    :aria-label="accessibilityLabel",
    @click="handleClick",
    @mouseup="handleMouseUpByBlurring",
  )
    span(:class="styles.Title")
      slot
  button(
    v-else,
    :id="id",
    role="tab",
    type="button",
    :tabIndex="tabIndex",
    :class="className",
    :aria-selected="selected",
    :aria-controls="panelID",
    :aria-label="accessibilityLabel",
    @click="handleClick",
    @mouseup="handleMouseUpByBlurring",
  )
    span(:class="styles.Title")
      slot
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { focusFirstFocusableNode, handleMouseUpByBlurring } from '@/utilities/focus';
import styles from '@/classes/Tabs.json';
import { UnstyledLink } from '@/components';

interface TabProps {
  id: string;
  focused?: boolean;
  siblingTabHasFocus?: boolean;
  selected?: boolean;
  panelID?: string;
  url?: string;
  measuring?: boolean;
  accessibilityLabel?: string;
}

const props = defineProps<TabProps>();
const slots = useSlots();

const emits = defineEmits<{
  (e: 'click', id: string): void;
}>();

const wasSelected = ref(props.selected);
const panelFocused = ref(false);
const tabNode = ref<HTMLLIElement | null>(null);

const tabIndex = computed(() => {
  if (props.selected && !props.siblingTabHasFocus && !props.measuring) {
    return 0;
  } else if (props.focused && !props.measuring) {
    return 0;
  }

  return -1;
});

const handleClick = () => {
  emits('click', props.id);
}

onMounted(() => {
  initialize();
});

watch(
  () => [props.focused, props.id, props.measuring, props.panelID, props.selected],
  () => {
    initialize();
  },
);

const initialize = () => {
  if (props.measuring) {
    return;
  }

  const itemHadFocus =
    props.focused || (document.activeElement && document.activeElement.id === props.id);

  if (itemHadFocus && props.selected && props.panelID && !panelFocused.value) {
    focusPanelID(props.panelID);
    panelFocused.value = true;
  }

  if (props.selected && !wasSelected.value && props.panelID) {
    focusPanelID(props.panelID);
  } else if (props.focused && tabNode.value) {
    focusFirstFocusableNode(tabNode.value);
  }

  wasSelected.value = props.selected;
}

const className = computed(() => {
  return classNames(
    styles.Tab,
    props.selected && styles['Tab-selected'],
  );
});

const tabContainerClassName = computed(() => {
  return classNames(
    styles.TabContainer,
    // props.selected && styles.Underline,
  );
});

const focusPanelID = (panelID: string) => {
  const panel = document.getElementById(panelID);
  if (panel) {
    panel.focus({ preventScroll: true });
  }
}
</script>
