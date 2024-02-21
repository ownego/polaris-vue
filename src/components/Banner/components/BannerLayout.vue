<template lang="pug">
WithinContentContainerBanner(
  v-if="withinContentContainer",
  v-bind="{ ...sharedBannerProps }",
  :bannerTitle="bannerTitle",
  :bannerIcon="bannerIcon",
  :actionButtons="actionButtons",
  :dismissButton="dismissButton",
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
    slot
  DefaultBanner(
    v-else,
    v-bind="{ ...sharedBannerProps }",
    :bannerTitle="bannerTitle",
    :bannerIcon="bannerIcon",
    :actionButtons="actionButtons",
    :dismissButton="dismissButton",
  )
    slot
</template>

<script setup lang="ts">
import { computed, h, getCurrentInstance, inject } from 'vue';
import styles from '@polaris/components/Banner/Banner.module.scss';
import useI18n from '@/use/useI18n';
import type { VueNode } from '@/utilities/types';
import { Icon, ButtonGroup, Text, Button } from '@/components';
import XIcon from '@icons/XIcon.svg';
import type { BannerProps } from '../types';
import { bannerAttributes } from '../types';

defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<BannerProps>(), {
  tone: 'info',
});

const i18n = useI18n();
const currentInstance = getCurrentInstance();

const withinContentContainer = inject<boolean>('WithinContentContext', false);

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

const bannerTitle = computed(() =>
  props.title && h(
    Text,
    { variant: 'headingSm', as: 'h2', breakWord: true },
    props.title,
  ),
);

const bannerIcon = computed(() =>
  !props.hideIcon && h(
    'span',
    { class: styles[bannerColors.value.icon] },
    [
      h(Icon, { source: props.icon || bannerAttributes[bannerTone.value].icon, }),
    ],
  )
);

const actionButtons = computed(() =>
  (props.action || props.secondaryAction) && h(
    ButtonGroup,
    [
      props.action
      && h(Button, { onClick: props.action.onAction, props: { ...props.action } }, props.action.content),
      props.secondaryAction
      && h(Button, { onClick: props.secondaryAction.onAction, props: { ...props.secondaryAction } }, props.secondaryAction.content),
    ],
  ),
)

const hasDismiss = computed(() => Boolean(currentInstance?.vnode.props?.onDismiss));

const dismissButton = computed(() => {
  return hasDismiss.value && h(
    Button,
    {
      variant: 'tertiary',
      icon: h(
        'span',
        { class: styles[isInlineIconBanner.value ? 'icon-secondary' : bannerColors.value.icon] },
        [ h(Icon, { source: XIcon }) ],
      ),
      onClick: currentInstance?.vnode.props?.onDismiss,
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton'),
    }
  )
});
</script>
