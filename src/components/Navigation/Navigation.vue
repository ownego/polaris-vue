<template lang="pug">
nav(
  :class="styles.Navigation",
  :aria-labelledby="ariaLabelledBy",
)
  div(
    v-if="slots.contextControl",
    :class="styles.ContextControl",
  )
    slot(name="contextControl")
  div(
    v-else-if="logo",
    :class="className",
  )
    UnstyledLink(
      :url="logo.url || ''",
      :class="styles.LogoLink",
      :style="{ width }",
    )
      Image(
        :source="logo.topBarSource || ''",
        :alt="logo.accessibilityLabel || ''",
        :class="styles.Logo",
        :style="{ width }",
      )
    slot(name="logo-suffix")
  Scrollable(:class="styles.PrimaryNavigation")
    slot
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { getWidth } from 'polaris/polaris-react/src/utilities/get-width';
import styles from '@/classes/Navigation.json';
import { UseFrame } from '@/utilities/frame';
import { hasSlot } from '@/utilities/has-slot';
import {
  Scrollable,
  Image,
  UnstyledLink,
} from '@/components';

interface NavigationProps {
  location: string;
  onDismiss?(): void;
  /** id of the element used as aria-labelledby */
  ariaLabelledBy?: string;
}

const props = defineProps<NavigationProps>();

const { useFrame } = UseFrame();
const { logo } = useFrame();
const width = getWidth(logo, 104);

const slots = useSlots();

const className = computed(() => classNames(
  styles.LogoContainer,
  hasSlot(slots['logo-suffix']) && styles.hasLogoSuffix,
));

provide('NavigationContext', {
  location: props.location,
  onNavigationDismiss: props.onDismiss,
  withinContentContainer: false,
});
provide('WithinContentContext', true);

</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/Navigation/Navigation.scss';
</style>
