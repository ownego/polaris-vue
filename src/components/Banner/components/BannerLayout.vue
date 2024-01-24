<template lang="pug">
WithinContentContainerBanner(
  v-if="withinContentContainer",
  v-bind="{ ...sharedBannerProps }",
  :bannerTitle="bannerTitle",
  :bannerIcon="bannerIcon",
  :actionButtons="actionButtons",
  :dismissButton="dismissButton",
)
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
import { computed, h, useAttrs } from 'vue';
import styles from '@polaris/components/Banner/Banner.module.scss';
import useI18n from '@/use/useI18n';
import { useWithinContent } from '@/use/useContent';
import type { VueNode } from '@/utilities/types';
import { Icon, ButtonGroup, Text, Button } from '@/components';
import CancelMinor from '@icons/CancelMinor.svg';
import type { BannerProps } from '../types';
import { bannerAttributes } from '../types';

const slot = defineSlots<{
  /** The content to display inside the button */
  default: (_: VueNode) => any;
}>();

const props = withDefaults(defineProps<BannerProps>(), {
  tone: 'info',
});

const i18n = useI18n();
const attrs = useAttrs();
const withinContentContainer = useWithinContent();

const isInlineIconBanner = computed(() => !props.title && !withinContentContainer.value);

const bannerTone = computed(() => Object.keys(bannerAttributes).includes(props.tone)
  ? props.tone
  : 'info',
);

const bannerColors = computed(() =>
  bannerAttributes[bannerTone.value][
  withinContentContainer ? 'withinContentContainer' : 'withinPage'
  ],
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
    { className: styles[bannerColors.value.icon] },
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

const dismissListener = computed(() => {
  if (attrs['onDismiss']) {
    return attrs['onDismiss'];
  }
});

const dismissButton = computed(() =>
  dismissListener.value && h(
    Button,
    {
      variant: 'tertiary',
      icon: h(
        'span',
        { className: isInlineIconBanner ? 'icon-secondary' : bannerColors.value.icon },
        [ h(Icon, { source: CancelMinor }) ],
      ),
      onClick: () => { dismissListener.value },
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton')
    }
  )
);
</script>
