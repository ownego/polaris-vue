<template lang="pug">
WithinContentContainerBanner(
  v-if="withinContentContainer",
  v-bind="{ ...sharedBannerProps }",
  :bannerTitle="bannerTitle",
  :bannerIcon="bannerIcon",
  :actionButtons="actionButtons",
  :dismissButton="dismissButton",
)
  Text(
    v-if="hasSlot(slots.default)",
    as="span",
    variant="bodyMd",
  )
    slot
template(v-else)
  InlineIconBanner(
    v-if="isInlineIconBanner",
    v-bind="{ ...sharedBannerProps }",
    :bannerIcon="bannerIcon",
    :actionButtons="actionButtons",
    :dismissButton="dismissButton",
  )
    Text(
      v-if="hasSlot(slots.default)",
      as="span",
      variant="bodyMd",
    )
      slot
  DefaultBanner(
    v-else,
    v-bind="{ ...sharedBannerProps }",
    :bannerTitle="bannerTitle",
    :bannerIcon="bannerIcon",
    :actionButtons="actionButtons",
    :dismissButton="dismissButton",
  )
    Text(
      v-if="hasSlot(slots.default)",
      as="span",
      variant="bodyMd",
    )
      slot
</template>

<script setup lang="ts">
import { computed, h, getCurrentInstance } from 'vue';
import styles from '@polaris/components/Banner/Banner.module.css';
import useI18n from '@/use/useI18n';
import { Text, Icon, ButtonGroup, Button } from '@/components';
import WithinContentContainerBanner from './WithinContentContainerBanner.vue';
import InlineIconBanner from './InlineIconBanner.vue';
import DefaultBanner from './DefaultBanner.vue';
import type { VueNode } from '@/utilities/types';
import { useHasSlot } from '@/use/useHasSlot';
import XIcon from '@icons/XIcon.svg';
import type { BannerProps } from '../types';
import { bannerAttributes } from '../types';
import useWithinContentContext from '../context';

const slots = defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

type BannerLayoutEmits = {
  /** Callback when Banner is dismissed */
  'dismiss': [];
}

const props = withDefaults(defineProps<BannerProps>(), {
  tone: 'info',
});

const emits = defineEmits<BannerLayoutEmits>();

const i18n = useI18n();
const currentInstance = getCurrentInstance();
const { hasSlot } = useHasSlot();

const withinContentContainer = useWithinContentContext();

const isInlineIconBanner = computed(() => !props.title && !withinContentContainer);

const bannerTone = computed(() => Object.keys(bannerAttributes).includes(props.tone)
  ? props.tone
  : 'info',
);

const bannerColors = computed(() =>
  bannerAttributes[bannerTone.value][
  withinContentContainer ? 'withinContentContainer' : 'withinPage'
  ]
);

const sharedBannerProps = computed(() => {
  return {
    backgroundColor: bannerColors.value.background,
    textColor: bannerColors.value.text,
  }
});

const bannerTitle = props.title
  ? h(
    Text,
    { variant: 'headingSm', as: 'h2', breakWord: true },
    () => props.title,
  )
  : undefined;

const bannerIcon = !props.hideIcon
  ? h(
    'span',
    { class: styles[bannerColors.value.icon] },
    h(Icon, { source: props.icon || bannerAttributes[bannerTone.value].icon, }),
  )
  : undefined;

const actionButtons = (props.action || props.secondaryAction)
  ? h(
    ButtonGroup,
    () => [
      props.action && h(Button,
        { onClick: props.action?.onAction, ...props.action },
        () => props.action?.content,
      ),
      props.secondaryAction && h(Button,
        { onClick: props.secondaryAction.onAction, ...props.secondaryAction },
        () => props.secondaryAction?.content,
      ),
    ],
  )
  : undefined;

const hasDismiss = computed(() => Boolean(currentInstance?.vnode.props?.onDismiss));

const dismissButton = hasDismiss.value
  ? h(
    Button,
    {
      variant: 'tertiary',
      icon: h(
        'span',
        { class: styles[isInlineIconBanner.value ? 'icon-secondary' : bannerColors.value.icon] },
        h(Icon, { source: XIcon }),
      ),
      onClick: () => emits('dismiss'),
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton'),
    },
  )
  : undefined;
</script>
