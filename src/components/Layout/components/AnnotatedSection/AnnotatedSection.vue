<template lang="pug">
div(:class="styles.AnnotatedSection")
  div(:class="styles.AnnotationWrapper")
    div(:class="styles.Annotation")
      TextContainer
        Text(:id="id", variant="headingMd", as="h2")
          slot(name="title")
        Box(
          v-if="!isDescriptionSlotContainHTMLTag",
          color="text-subdued",
        )
          slot(name="description")
        slot(v-else, name="description")
    div(:class="styles.AnnotationContent")
      slot
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import styles from '@/classes/Layout.json';
import { Box, Text, TextContainer } from '@/components';

interface Props {
  id?: string;
}

defineProps<Props>();

const slots = useSlots();
const descriptionSlot = computed(() => slots.description?.());

const isDescriptionSlotContainHTMLTag = computed(() => Boolean(
  descriptionSlot.value
    && (descriptionSlot.value.length >= 2
      || (descriptionSlot.value[0]
        && (descriptionSlot.value[0].type.toString() !== 'Symbol(Text)'
        || descriptionSlot.value[0].type.toString() !== 'Symbol()')
      )),
));
</script>
