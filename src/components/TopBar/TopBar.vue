<template lang="pug">
div(:class="styles.TopBar")
  button(
    v-if="showNavigationToggle",
    type="button",
    :class="iconClassName",
    @click="$emit('navigation-toggle')",
    @focus="forceTrueFocused",
    @blur="forceFalseFocused",
    :aria-label="i18n.translate('Polaris.TopBar.toggleMenuLabel')",
  )
    div(:class="styles.IconWrapper")
      Icon(:source="MobileHamburgerMajor")
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
  div(:class="styles.Contents")
    div(:class="styles.SearchField")
      template(v-if="slots.searchField")
        slot(name="searchField")
        Search(
          :visible="searchResultsVisible",
          :overlayVisible="searchResultsOverlayVisible",
          @dismiss="$emit('search-result-dismiss')",
        )
          slot(name="searchResults")
    div(:class="styles.SecondaryMenu")
      slot(name="secondaryMenu")
    slot(name="userMenu")
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { getWidth  } from 'polaris/polaris-react/src/utilities/get-width';
import MobileHamburgerMajor from '@icons/MobileHamburgerMajor.svg';
import { hasSlot } from '@/utilities/has-slot';
import styles from '@/classes/TopBar.json';
import { UseFrame } from '@/utilities/frame';
import { Icon, Image, UnstyledLink } from '@/components';
import { UseI18n } from '@/use';
import { Search } from './components';

interface TopBarProps {
  /** Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav toggle button */
  showNavigationToggle?: boolean;
  /** A boolean property indicating whether search results are currently visible. */
  searchResultsVisible?: boolean;
  /** Whether or not the search results overlay has a visible backdrop */
  searchResultsOverlayVisible?: boolean;
}

const props = withDefaults(defineProps<TopBarProps>(), {
  searchResultsOverlayVisible: false,
});

const i18n = UseI18n();

const { useFrame } = UseFrame();
const { logo } = useFrame();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'search-result-dismiss'): void;
  (e: 'navigation-toggle'): void;
}>();

const focused = ref(false);

const forceTrueFocused = () => {
  focused.value = true;
};

const forceFalseFocused = () => {
  focused.value = false;
};

const iconClassName = computed(() => {
  return classNames(
    styles.NavigationIcon,
    focused.value && styles.focused,
  );
});

const className = computed(() => {
  return classNames(
    styles.LogoContainer,
    props.showNavigationToggle || slots.searchField
      ? styles.LogoDisplayControl
      : styles.LogoDisplayContainer,
    hasSlot(slots['logo-suffix']) && styles.hasLogoSuffix,
  );
});

const width = getWidth(logo, 104);

</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/TopBar/TopBar.scss';
</style>
