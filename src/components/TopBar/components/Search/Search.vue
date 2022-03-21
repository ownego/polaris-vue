<template lang="pug">
SearchDismissOverlay(
  v-if="visible && slots.default",
  :visible="overlayVisible",
  @dismiss="$emit('dismiss')",
)
div(
  v-if="slots.default",
  :class="className",
)
  //- TODO: Fix this - add `color-scheme="dark"` to CustomProperties component
  CustomProperties()
    div(:class="styles.SearchContent")
      div(:class="styles.Results")
        slot
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/TopBar-Search.json';
import { CustomProperties } from '@/components';
import { SearchDismissOverlay } from '../SearchDismissOverlay';

interface SearchProps {
  /** Toggles whether or not the search is visible */
  visible?: boolean;
  /** Whether or not the search results overlay has a visible backdrop */
  overlayVisible?: boolean;
}

const props = withDefaults(defineProps<SearchProps>(), {
  overlayVisible: false,
});

const slots = useSlots();

const emits = defineEmits<{
  (e: 'dismiss'): void;
}>();

const className = computed(() => classNames(styles.Search, props.visible && styles.visible));
</script>

<style lang="scss">
@import 'polaris-react/src/components/TopBar/components/Search/Search.scss';
</style>
