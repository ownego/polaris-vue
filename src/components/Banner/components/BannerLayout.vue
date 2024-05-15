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
import { computed, h, getCurrentInstance, resolveComponent } from 'vue';
import styles from '@polaris/components/Banner/Banner.module.css';
import useI18n from '@/use/useI18n';
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

const bannerTitle = computed(() =>
  props.title ? () => h(
    resolveComponent('Text'),
    { variant: 'headingSm', as: 'h2', breakWord: true },
    () => props.title,
  ) : null,
);

const bannerIcon = computed(() =>
  !props.hideIcon ? () => h(
    'span',
    { class: styles[bannerColors.value.icon] },
    h(resolveComponent('Icon'), { source: props.icon || bannerAttributes[bannerTone.value].icon, }),
  ) : null,
);

const actionButtons = computed(() =>
  (props.action || props.secondaryAction) ? () => h(
    resolveComponent('ButtonGroup'),
    () => [
      props.action && h(resolveComponent('Button'),
        { onClick: props.action.onAction, props: { ...props.action } },
        () => props.action?.content,
      ),
      props.secondaryAction && h(resolveComponent('Button'),
        { onClick: props.secondaryAction.onAction, props: { ...props.secondaryAction } },
        () => props.secondaryAction?.content,
      ),
    ],
  ) : null,
);

const hasDismiss = computed(() => Boolean(currentInstance?.vnode.props?.onDismiss));

const dismissButton = computed(() =>
  hasDismiss.value ? () => h(
    resolveComponent('Button'),
    {
      variant: 'tertiary',
      icon: h(
        'span',
        { class: styles[isInlineIconBanner.value ? 'icon-secondary' : bannerColors.value.icon] },
        h(resolveComponent('Icon'), { source: XIcon }),
      ),
      onClick: () => emits('dismiss'),
      accessibilityLabel: i18n.translate('Polaris.Banner.dismissButton'),
    },
  ) : null,
);
</script>
