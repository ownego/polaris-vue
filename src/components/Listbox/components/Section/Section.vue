<template lang="pug">
li(
  role="presentation",
  v-bind="listboxSectionDataSelector",
)
  slot(name="title")
  ul(
    role="group",
    :aria-labelledby="sectionId",
    :class="className",
  )
    slot
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  listboxSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import styles from '@/classes/Listbox-Section.json';
import { UseUniqueId } from '@/use';

interface SectionProps {
  divider?: boolean;
}

const props = defineProps<SectionProps>();

const { useUniqueId } = UseUniqueId();
const sectionId = useUniqueId('ListboxSection');

provide('sectionContext', sectionId);

const className = computed(() => classNames(
  styles.SectionGroup,
  !props.divider && styles.noDivider,
));
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Section/Section.scss';
</style>
