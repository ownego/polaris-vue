<template lang="pug">
div(:class="styles.AnnotatedSection")
  div(:class="styles.AnnotationWrapper")
    div(:class="styles.Annotation")
      TextContainer(spacing="tight")
        Text(:id="id", variant="headingMd", as="h2")
          slot(v-if="slots.title", name="title")
          template(v-else) {{ title }}
        Box(v-if="hasDescription", color="text-secondary")
          slot(v-if="slots.description", name="description")
          Text(v-else, as="p", variant="bodyMd") {{ description }}

    div(:class="styles.AnnotationContent")
      slot
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { VueNode } from '@/utilities/types';

export type AnnotatedSectionProps = {
  id?: string;
  title?: string;
  description?: string;
}

const props = defineProps<AnnotatedSectionProps>();

const slots = defineSlots<{
  default: (_: VueNode) => any;
  title?: (_: VueNode) => any;
  description?: (_: VueNode) => any;
}>();

const styles = useCssModule();

const hasDescription = computed(() => Boolean(slots.description || props.description));
</script>

<style lang="scss" module>
@import '@polaris/components/Layout/Layout.module.scss';
</style>
