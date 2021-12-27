<template lang="pug">
component(
  :is="to ? 'router-link' : 'a'",
  :href="url",
  :to="to",
  :target="target",
  :rel="rel",
  v-bind="$attrs",
  v-on="$listeners",
)
  <!-- Slot for displaying content inside the link -->
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class UnstyledLink extends Vue {
  /**
   * Set to for router-link
   */
  @Prop({ type: [String, Object] })
  public to!: string | object

  /**
   * The url to Link to
   */
  @Prop({ type: String })
  public url!: string

  /**
   * Makes the link open in new tab
   */
  @Prop({ type: Boolean })
  public external!: boolean

  get target(): string {
    return this.external ? '_blank' : '_self';
  }

  get rel(): string {
    return this.external ? 'noopener noreferrer' : '';
  }
}
</script>
