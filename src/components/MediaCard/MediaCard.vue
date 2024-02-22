<template lang="pug">
LegacyCard
  div(:class="mediaCardClassName")
    div(:class="mediaContainerClassName")
      slot
    div(:class="infoContainerClassName")
      Box(:padding="500")
        BlockStack(:gap="200")
          InlineStack(
            align="space-between",
            :wrap="false",
            :gap="200",
          )
            slot(v-if="hasSlot(slots.title)", name="title")
            Text(
              v-else="typeof title === 'string'",
              variant="headingSm",
              as="h2",
            ) {{ title }}
            Box(
              v-if="popoverActions.length > 0 || hasDismiss",
              position="absolute",
              :insetInlineEnd="500",
              :zIndex="'var(--p-z-index-2)'",
            )
              InlineStack(:gap="100", :wrap="false")
                Popover(
                  v-if="popoverActions.length > 0",
                  :active="popoverActive",
                  :onClose="togglePopoverActive",
                  preferredAlignment="left",
                  preferredPosition="below",
                )
                  template(#activator)
                    InlineStack(blockAlign="center")
                      Button(
                        variant="tertiary",
                        size="slim",
                        :icon="MenuHorizontalIcon",
                        :accessibilityLabel="i18n.translate('Polaris.MediaCard.popoverButton')",
                        @click="togglePopoverActive",
                      )
                  ActionList(
                    :items="popoverActions",
                    @action-any-item="togglePopoverActive",
                  )
                Button(
                  v-if="hasDismiss",
                  size="slim",
                  variant="tertiary",
                  :icon="XIcon"
                  :accessibilityLabel="i18n.translate('Polaris.MediaCard.dismissButton')",
                  @click="emits('dismiss')",
                )
          p(:class="styles.Description") {{ description }}
          div(:class="actionClassName")
            ButtonGroup
              ButtonFrom(v-if="primaryAction", :action="primaryAction")
              ButtonFrom(v-if="secondaryAction", :action="secondaryAction")
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import styles from '@polaris/components/MediaCard/MediaCard.module.scss';
import useI18n from '@/use/useI18n';
import type {
  VueNode,
  ComplexAction,
  ActionListItemDescriptor,
} from '@/utilities/types';
import { useToggle } from '@/use/useToggle';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import MenuHorizontalIcon from '@icons/MenuHorizontalIcon.svg';
import XIcon from'@icons/XIcon.svg';
import { ButtonFrom } from '../Button';

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
  /** Heading content. */
  title?: string;
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
const { hasSlot } = useHasSlot();
const { value: popoverActive, toggle: togglePopoverActive } = useToggle(false);
const currentInstance = getCurrentInstance();

const mediaCardClassName = computed(() => classNames(
  styles.MediaCard,
  props.portrait && styles.portrait,
));

const mediaContainerClassName = computed(() => classNames(
  styles.MediaContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));

const infoContainerClassName = computed(() => classNames(
  styles.InfoContainer,
  props.portrait && styles.portrait,
  props.size === 'small' && styles.sizeSmall,
));

const actionClassName = computed(() => classNames(
  styles.ActionContainer,
  props.portrait && styles.portrait,
));

const hasDismiss = computed(() => Boolean(currentInstance?.vnode.props?.onDismiss));
</script>
