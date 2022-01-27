<template lang="pug">
div(:class="className")
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/Layout.json';
import { Section } from './components';

@Component({
  components: {
    Section,
  },
})
export default class Layout extends Vue {
  /**
   * Automatically adds sections to layout
   */
  @Prop({ type: Boolean })
  public sectioned?: boolean;

  public className = styles.Layout
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Layout/Layout.scss';
</style>
