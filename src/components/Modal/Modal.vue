<template lang="pug">
<!-- activator markup -->
template(v-if="hasSlot(slots.activator)")
  Box(ref="activatorRef")
    slot(name="activator")

Portal(
  v-if="open",
  id-prefix="modal",
)
  Dialog(
    :instant="instant",
    :labelled-by="headerId",
    :size="size",
    :limit-height="limitHeight",
    @close="emits('close')",
    @closing="setClosing",
    @entered="handleEntered",
    @exited="handleExited",
  )
    Header(
      :title-hidden="titleHidden",
      :id="headerId",
      :closing="closing",
      @close="emits('close')",
    )
      slot(name="title")
    
    <!-- body markup -->
    iframe(
      v-if="src",
      :name="iFrameName",
      :title="iframeTitle",
      :src="src",
      :class="styles.Iframe",
      :style="{ height: `${iframeHeight}px` }",
      @load="handleIframeLoad",
    ) 
    div(
      v-else-if="noScroll",
      :class="styles.noScrollBody",
    )
      Box(
        width="100%",
        overflow-x="hidden",
        overflow-y="hidden",
      )
        <!-- body -->
        Box(
          v-if="loading",
          padding="400",
        )
          InlineStack(
            gap="400",
            align="center",
            block-align="center",
          )
            Spinner
        template(v-else)
          Section(
            v-if="sectioned",
            :title-hidden="titleHidden",
          )
            slot
          slot(v-else)
    Scrollable(
      v-else,
      shadow,
      :class="styles.Body",
      @scrolled-to-bottom="emits('scrolled-to-bottom')",
    )
      <!-- body -->
      Box(
        v-if="loading",
        padding="400",
      )
        InlineStack(
          gap="400",
          align="center",
          block-align="center",
        )
          Spinner
      template(v-else)
        Section(
          v-if="sectioned",
          :title-hidden="titleHidden",
        )
          slot
        slot(v-else)
  
    <!-- footer markup -->
    Footer(
      v-if="hasSlot(slots.footer)  || primaryAction || secondaryActions",
      :primary-action="primaryAction",
      :secondary-actions="secondaryActions",
    ) 
      slot(name="footer")

  Backdrop(
    @closing="setClosing", 
    @click="emits('close')",
  )
</template>

<script setup lang="ts">
import {
  ref,
  useSlots,
  provide,
} from 'vue';
import useId from '@/use/useId';
import useI18n from '@/use/useI18n';
import { useHasSlot } from '@/use/useHasSlot';
import { focusFirstFocusableNode } from '@/utilities/focus';
import styles from '@polaris/components/Modal/Modal.module.scss';
import {
  Portal,
  Spinner,
  Backdrop,
  Scrollable,
} from '@/components';
import {
  Dialog,
  Header,
  Section,
  Footer,
} from './components';
import {
  type VueNode,
  type ComplexAction,
} from '@/utilities/types';
import { type ModalSize } from './utils';

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

interface ModalProps {
  /** Whether the modal is open or not */
  open: boolean;
  /** The url that will be loaded as the content of the modal */
  src?: string;
  /** The name of the modal content iframe */
  iFrameName?: string;
  /**
   * Hide the title in the modal
   * @default false
   */
  titleHidden?: boolean;
  /** Disable animations and open modal instantly */
  instant?: boolean;
  /** Automatically adds sections to modal */
  sectioned?: boolean;
  /** The size of the modal */
  size?: ModalSize;
  /** Increases the modal width */
  large?: boolean;
  /** Decreases the modal width */
  small?: boolean;
  /** Limits modal height on large screens with scrolling */
  limitHeight?: boolean;
  /** Replaces modal content with a spinner while a background action is being performed */
  loading?: boolean;
  /** Removes Scrollable container from the modal content */
  noScroll?: boolean;
  /** Sets modal to the height of the viewport on small screens */
  fullScreen?: boolean;
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** Click or tap the area outside to close the modal */
  clickOutsideToClose?: boolean;
}

export type ModalSlots = {
  /** The element or the RefObject that activates the Modal */
  activator: (_VueNode: VueNode) => null;
  /** The content for the title of the modal */
  title: (_: VueNode) => null;
  /** The content to display inside modal */
  default: (_: VueNode) => null;
  /** Inner content of the footer */
  footer: (_: VueNode) => null;
}

export type ModalEvents = {
  /** Callback when iframe has loaded */
  'iframe-load': [source: Event],
  /** Callback when modal transition animation has ended */
  'transition-end': [],
  /** Callback when the bottom of the modal content is reached */
  'scrolled-to-bottom': [],
  /** Callback when the modal is closed */
  'close': [],
}

withDefaults(defineProps<ModalProps>(), {
  titleHidden: false,
});

defineSlots<ModalSlots>();

const emits = defineEmits<ModalEvents>();

const slots = useSlots();
const { hasSlot } = useHasSlot();
const i18n = useI18n();

const headerId = String(useId());
const iframeTitle = i18n.translate('Polaris.Modal.iframeTitle');

const activatorNode = ref<HTMLElement | null>(null);

const iframeHeight = ref<number>(IFRAME_LOADING_HEIGHT);
const closing = ref<boolean>(false);

const handleIframeLoad = (evt: Event) => {
  const iframe = evt.target as HTMLIFrameElement;
  
  if (iframe && iframe.contentWindow) {
    try {
      iframeHeight.value = iframe.contentWindow.document.body.scrollHeight;
    } catch (_error) {
      iframeHeight.value = DEFAULT_IFRAME_CONTENT_HEIGHT;
    }
  }

  emits('iframe-load', evt);
}

const handleEntered = () => {
  emits('transition-end');
}

const handleExited = () => {
  iframeHeight.value = IFRAME_LOADING_HEIGHT;

  const node = activatorNode.value;

  if (node) {
    requestAnimationFrame(() => focusFirstFocusableNode(node));
  }
};

const setClosing = (newVal: boolean) => {
  closing.value = newVal;
};

provide('within-content-context', true);
</script>
