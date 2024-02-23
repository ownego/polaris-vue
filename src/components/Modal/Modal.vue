<template lang="pug">
div(v-if="slots.activator", ref="activatorNode")
  slot(name="activator")

Portal(
  v-if="domReady && open",
  id-prefix="modal",
)
  Dialog(
    :instant="instant",
    :labelled-by="headerId",
    :large="large",
    :small="small",
    :limit-height="limitHeight",
    :full-screen="fullScreen",
    @close="emit('close')",
    @entered="handleEntered",
    @exited="handleExited",
    @closing="setClosing",
  )
    Header(
      key="header",
      :title-hidden="titleHidden",
      :id="headerId",
      :closing="closing",
      @close="emit('close')",
    )
      slot(name="title")

    div(:class="styles.BodyWrapper", key="body")
      iframe(
        v-if="src",
        :title="iframeTitle",
        :name="iFrameName",
        :src="src",
        :class="styles.IFrame",
        :style="{ height: `${iframeHeight}px` }",
        @load="handleIframeLoad",
      )
      div(
        v-else-if="noScroll",
        :class="styles.Body",
      )
        div(
          v-if="loading",
          :class="styles.Spinner",
        )
          Spinner
        template(v-else)
          Section(v-if="sectioned")
            slot
          slot(v-else)
          
      Scrollable(
        v-else,
        :shadow="true",
        :class="styles.Body",
        @scrolled-to-bottom="emit('scrolled-to-bottom')",
      )
        div(
          v-if="loading",
          :class="styles.Spinner",
        )
          Spinner
        template(v-else)
          Section(v-if="sectioned")
            slot
          slot(v-else)

    Footer(
      v-if="slots.footer || primaryAction || secondaryActions",
      :primary-action="primaryAction",
      :secondary-actions="secondaryActions",
      key="footer",
    )
      slot(name="footer")

  Backdrop(
    @closing="setClosing",
    @click="clickOutsideToClose ? emit('close') : null",
  )
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, provide } from 'vue';
import useId from '@/use/useId';
import useI18n from '@/use/useI18n';
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
  /** The content to display inside modal */
  /** Disable animations and open modal instantly */
  instant?: boolean;
  /** Automatically adds sections to modal */
  sectioned?: boolean;
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

withDefaults(defineProps<ModalProps>(), {
  titleHidden: false,
});

const emit = defineEmits<{
  'iframe-load': [source: Event],
  'transition-end': [],
  'scrolled-to-bottom': [],
  'close': [],
}>();

defineSlots<ModalSlots>();

const slots = useSlots();
const i18n = useI18n();

const headerId = String(useId());
const iframeTitle = i18n.translate('Polaris.Modal.iframeTitle');

const activatorNode = ref<HTMLElement | null>(null);

const iframeHeight = ref<number>(IFRAME_LOADING_HEIGHT);
const domReady = ref<boolean>(false);
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

  emit('iframe-load', evt);
}

const handleEntered = () => {
  emit('transition-end');
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

onMounted(() => {
  domReady.value = true;
});

provide('within-content-context', true);
</script>
