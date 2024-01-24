<template lang="pug">
LegacyCard
  div(:className="mediaCardClassName")
    div(:className="mediaContainerClassName")
      slot
    div(:className="infoContainerClassName")
      Box(:padding="500")
        BlockStack(:gap="200")
          InlineStack(
            align="space-between",
            :wrap="false",
            :gap="200",
          )
            span(v-if="typeof title === 'string'")
              Text(variant="headingSm", as="h2") {{ title }}
              component(v-else, :is="title")
            Box(
              v-if="popoverActions.length > 0 || attrs['onDismiss']",
              position="absolute",
              :insetInlineEnd="500",
              :zIndex="'var(--p-z-index-2)'",
            )
              InlineStack(:gap="100", :wrap="false")
                Popover(
                  v-if="popoverActions.length > 0",
                  :active="popoverActive",
                  :activator="popoverActivator",
                  :onClose="togglePopoverActive",
                  preferredAlignment="left"
                  preferredPosition="below"
                )
                  ActionList(
                    :items="popoverActions",
                    @action-any-item="togglePopoverActive",
                  )
                Button(
                  v-if="attrs['onDismiss']",
                  size="slim",
                  variant="tertiary",
                  :icon="CancelMinor"
                  :accessibilityLabel="i18n.translate('Polaris.MediaCard.dismissButton')",
                  @click="attrs['onDismiss']",
                )
          p(:className="styles.Description") {{ description }}
          div(:className="actionClassName")
            ButtonGroup
              FormButton(v-if="primaryAction", :action="primaryAction")
              FormButton(v-if="secondaryAction", :action="secondaryAction")
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import styles from '@polaris/components/MediaCard/MediaCard.module.scss';
import useI18n from '@/use/useI18n';
import type {
  VueNode,
  ComplexAction,
  ActionListItemDescriptor,
} from '@/utilities/types';
import { useToggle } from '@/use/useToggle';
import { classNames } from '@/utilities/css';

type Size = 'small' | 'medium';

interface MediaCardProps {
  /** Body content */
  description: string;
  /** Main call to action, rendered as a basic button */
  primaryAction?: ComplexAction;
  /** Secondary call to action, rendered as a plain button */
  secondaryAction?: ComplexAction;
  /** Action list items to render in ellipsis popover */
  popoverActions?: ActionListItemDescriptor[];
  /** Whether or not card content should be laid out vertically
   * @default false
   */
  portrait?: boolean;
  /** Size of the visual media in the card
   * @default 'medium'
   */
  size?: Size;
}

const slots = defineSlots<{
  /** The visual media to display in the card */
  default: (_: VueNode) => any;
  /** Heading content */
  title: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<MediaCardProps>(), {
  popoverActions: () => [],
  portrait: false,
  size: 'medium',
});

type MediaCardEmits = {
  /** Callback when MediaCard is dismissed */
  'dismiss': [];
}

const emits = defineEmits<MediaCardEmits>();

const i18n = useI18n();
const {
  value: focused,
  toggle: toggleFocused,
} = useToggle(false);
const attrs = useAttrs();

const mediaCardClassName = computed(() =>
  classNames(
    styles.MediaCard,
    props.portrait && styles.portrait,
  ),
);

const mediaContainerClassName = computed(() =>
  classNames(
    styles.MediaContainer,
    props.portrait && styles.portrait,
    props.size === 'small' && styles.sizeSmall,
  ),
);

const infoContainerClassName = computed(() =>
  classNames(
    styles.InfoContainer,
    props.portrait && styles.portrait,
    props.size === 'small' && styles.sizeSmall,
  ),
);
</script>
