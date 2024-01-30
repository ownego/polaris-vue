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
import { type VNode, computed, provide } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import useId from '@/use/useId';
import { listboxSectionDataSelector } from '@polaris/components/Listbox/components/Section/selectors';
import styles from '@polaris/components/Listbox/components/Section/Section.module.scss';

interface SectionProps {
  divider?: boolean;
}

interface SectionSlots {
  default?: (_?: VueNode) => VNode[];
  title?: (_?: VueNode) => VNode[];
}

const props = withDefaults(defineProps<SectionProps>(), {
  divider: true,
});
const slots = defineSlots<SectionSlots>();

const sectionId = String(useId());

const className = computed(() => classNames(
  styles.Section,
  !props.divider && styles.noDivider,
));

provide('section-context', sectionId);
</script>
