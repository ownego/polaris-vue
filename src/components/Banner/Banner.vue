<template lang="pug">
div(
  :class="className",
  tabIndex="0",
  ref="wrapperRef",
  :role="ariaRoleType",
  :aria-live="stopAnnouncements ? 'off' : 'polite'",
  @mouseup="handleMouseUp",
  @keyup="handleKeyUp",
  @blur="handleBlur",
  :aria-labelledby="headingID",
  :aria-describedby="contentID",
)
  div(
    v-if="attrs.onDismiss",
    :class="styles.Dismiss",
  )
    Button(
      plain,
      :icon="CancelSmallMinor",
      @click="$emit('dismiss')",
      accessibilityLabel="Dismiss notification",
    )

  div(:class="styles.Ribbon")
    Icon(:source="iconName", :color="iconColor")

  div(:class="styles.ContentWrapper")
    div(
      :class="styles.Heading",
      :id="headingID",
    )
      Heading(element="p") {{ title }}

    div(
      v-if="hasSlot(slots.default) || action || secondaryAction",
      :class="styles.Content",
      :id="contentID",
    )
      slot
      div(v-if="action || secondaryAction", :class="styles.Actions")
        ButtonGroup
          div(v-if="action", :class="styles.PrimaryAction")
            button(
              v-if="action.loading",
              disabled,
              aria-busy,
              :class="spinnerClassName",
            )
              span(:class="styles.Spinner")
                Spinner(
                  size="small",
                  :accessibilityLabel="i18n.translate('Polaris.Button.spinnerAccessibilityLabel')",
                )
              | {{ action.content }}
            UnstyledButtonFrom(
              v-else,
              :action="action",
              :class="styles.Button",
            )
          template(v-if="secondaryAction")
            UnstyledLink(
              v-if="secondaryAction.url",
              :class="styles.SecondaryAction",
              :url="secondaryAction.url",
              :external="secondaryAction.external",
            )
              span(:class="styles.Text") {{ secondaryAction.content }}
            UnstyledButton(
              v-else,
              :class="styles.SecondaryAction",
              @click="secondaryAction.onAction",
            )
              span(:class="styles.Text") {{ secondaryAction.content }}
</template>

<script setup lang="ts">
import { inject, ref, computed, onMounted, useAttrs, provide, useSlots } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { UseUniqueId } from '@/use';
import type { Action } from '@/utilities/type';
import type { DisableableAction, LoadableAction } from '@/utilities/interface';
import { hasSlot } from '@/utilities/has-slot';
import { UseI18n } from '@/use';

import { Button, Heading, ButtonGroup, UnstyledButton, UnstyledLink, Spinner, Icon, UnstyledButtonFrom } from '@/components';
import type { IconProps } from '@/components/Icon/utils';

import CancelSmallMinor from '@icons/CancelSmallMinor.svg';
import CircleTickMajor from '@icons/CircleTickMajor.svg';
import CircleInformationMajor from '@icons/CircleInformationMajor.svg';
import CircleAlertMajor from '@icons/CircleAlertMajor.svg';
import DiamondAlertMajor from '@icons/DiamondAlertMajor.svg';

import styles from '@/classes/Banner.json';

type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

interface BannerAttributes {
  iconColor: IconProps['color'];
  defaultIcon: IconProps['source'];
  ariaRoleType: 'status' | 'alert';
}

interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Icon to display in the banner. Use only major, duotone icons */
  icon?: IconProps['source'];
  /** Sets the status of the banner. */
  status?: BannerStatus;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Disables screen reader announcements when changing the content of the banner */
  stopAnnouncements?: boolean;
}

const props = defineProps<BannerProps>();
const i18n = UseI18n();

const withinContentContainer = inject('WithinContentContext', false);
provide('BannerContext', false);

const { useUniqueId } = UseUniqueId();
const id = useUniqueId('Banner');

const headingID = computed(() => `${id}Heading`);
const contentID = computed(() => `${id}Content`);

const attrs = useAttrs();
const slots = useSlots();

const wrapperRef = ref<HTMLDivElement | null>(null);
const shouldShowFocus = ref(false);

const { defaultIcon, iconColor, ariaRoleType } = useBannerAttributes(props.status);

const iconName = computed(() => {
  return props.icon || defaultIcon;
});

const className = computed(() => {
  const onDismiss = !!attrs.onDismiss;

  return classNames(
    styles.Banner,
    props.status && styles[variationName('status', props.status)],
    onDismiss && styles.hasDismiss,
    shouldShowFocus.value && styles.keyFocused,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
  );
});

const spinnerClassName = computed(() => {
  return classNames(styles.Button, styles.loading);
});

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.target === wrapperRef.value) {
    shouldShowFocus.value = true;
  }
};

const handleBlur = () => {
  shouldShowFocus.value = false;
}
const handleMouseUp = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDivElement;
  target.blur();
  shouldShowFocus.value = false;
};

function useBannerAttributes(status: BannerProps['status']): BannerAttributes {
  switch (status) {
  case 'success':
    return {
      defaultIcon: CircleTickMajor,
      iconColor: 'success',
      ariaRoleType: 'status',
    };

  case 'info':
    return {
      defaultIcon: CircleInformationMajor,
      iconColor: 'highlight',
      ariaRoleType: 'status',
    };

  case 'warning':
    return {
      defaultIcon: CircleAlertMajor,
      iconColor: 'warning',
      ariaRoleType: 'alert',
    };

  case 'critical':
    return {
      defaultIcon: DiamondAlertMajor,
      iconColor: 'critical',
      ariaRoleType: 'alert',
    };

  default:
    return {
      defaultIcon: CircleInformationMajor,
      iconColor: 'base',
      ariaRoleType: 'status',
    };
  }
}
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Banner/Banner.scss';
</style>
