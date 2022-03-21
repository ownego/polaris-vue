<template lang="pug">
div(:class="styles.AnnotatedSection")
  div(:class="styles.AnnotationWrapper")
    div(:class="styles.Annotation")
      TextContainer
        Heading(:id="id")
          slot(name="title")
        div(
          v-if="!isDescriptionSlotContainHTMLTag",
          :class="styles.AnnotationDescription",
        )
          slot(name="description")
        slot(v-else, name="description")
    div(:class="styles.AnnotationContent")
      slot
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue';
import styles from '@/classes/Layout.json';
import { TextContainer } from '../../../TextContainer';
import { Heading } from '../../../Heading';

interface Props {
  id?: string;
}

const props = defineProps<Props>();

const slots = useSlots();
const descriptionSlot = computed(() => slots.description?.());

const isDescriptionSlotContainHTMLTag = computed(() => Boolean(
  descriptionSlot.value
    && (descriptionSlot.value.length >= 2
      || (descriptionSlot.value[0]
        && descriptionSlot.value[0].type.toString() !== 'Symbol(Text)')),
));
</script>
