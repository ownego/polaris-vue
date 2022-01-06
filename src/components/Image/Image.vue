<template lang="pug">
img(
  :src="source",
  :srcSet="sourceSet",
  :crossOrigin="crossOrigin",
  @error="onError",
  @load="onLoad",
)
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

interface SourceSet {
  source: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

@Component({
  /**
   * Name property using for prevent 'built-in or reserved HTML elements' warn
   */
  name: 'PImage',
})
export default class Image extends Vue {
  @Prop({ type: String, required: true })
  public alt!: string;

  @Prop({ type: String, required: true })
  public source!: string;

  @Prop({ type: String })
  public crossOrigin!: CrossOrigin;

  @Prop({ type: Array })
  public sourceSet!: SourceSet[];

  @Prop({ type: Function })
  public onLoad!: () => void;

  @Prop({ type: Function })
  public onError!: () => void;

  get finalSourceSet(): string | null {
    return this.sourceSet
      ? this.sourceSet
        .map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`)
        .join(',')
      : null;
  }
}
</script>
