<template lang="pug">
div(:class="annotatedSectionClassName")
  div(:class="annotationWrapperClassName")
    div(:class="annotationClassName")
      TextContainer
        Heading(:id="id")
          slot(name="title")
        div(
          v-if="!isDescriptionSlotContainHTMLTag",
          :class="AnnotationDescriptionClassName",
        )
          slot(name="description")
        slot(v-else, name="description")

    div(
      :class="annotationContentClassName",
    )
      slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/Layout.json';
import { TextContainer } from '../../../TextContainer';
import { Heading } from '../../../Heading';

@Component({
  components: {
    TextContainer,
    Heading,
  },
})
export default class AnnotatedSection extends Vue {
  @Prop({ type: String })
  public id?: string;

  public annotatedSectionClassName = styles.AnnotatedSection;

  public annotationWrapperClassName = styles.AnnotationWrapper;

  public annotationClassName = styles.Annotation;

  public annotationContentClassName = styles.AnnotationContent;

  public AnnotationDescriptionClassName = styles.AnnotationDescription;

  get isDescriptionSlotContainHTMLTag(): boolean {
    return Boolean(
      this.$slots.description
      && this.$slots.description.length < 2
      && this.$slots.description[0]?.tag,
    );
  }
}
</script>
