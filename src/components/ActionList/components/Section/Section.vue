<template lang="pug">
li(v-if="hasMultipleSections", :class="styles.Section", role="presentation")
  SectionMarkup(
    v-bind="sectionMarkupProps",
    @action-any-item="emit('action-any-item')",
  )
    template(v-for="{prefixId, suffixId} in section.items")
        slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
        slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
SectionMarkup(
  v-else,
  v-bind="sectionMarkupProps",
  @action-any-item="emit('action-any-item')",
)
  template(v-for="{prefixId, suffixId} in section.items")
    slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
    slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import styles from '@/classes/ActionList.json';
import SectionMarkup from './SectionMarkup.vue';
import type { ActionListSection } from '../../utils';

interface SectionProps {
  /** Section of action items */
  section: ActionListSection;
  /** Should there be multiple sections */
  hasMultipleSections: boolean;
  /** Defines a specific role attribute for each action in the list */
  actionRole?: 'option' | 'menuitem' | string;
  /** Whether or not the section is the first to appear */
  firstSection?: boolean;
}

const props = defineProps<SectionProps>();

const emit = defineEmits<{(event: 'action-any-item'): void}>();

const sectionMarkupProps = computed(() => {
  const {
    section, hasMultipleSections, actionRole, firstSection,
  } = props;
  return {
    section, hasMultipleSections, actionRole, firstSection,
  };
});
</script>
