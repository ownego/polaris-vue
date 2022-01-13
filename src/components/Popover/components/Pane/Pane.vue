<template lang="pug">
div(
  v-if="fixed"
  :class="className"
)
  Section(v-if="sectioned")
    slot
  slot(v-else)
Scrollable(
  v-else,
  shadow,
  :class="className",
  @scrolled-to-bottom="$emit('scrolled-to-bottom')",
)
  Section(v-if="sectioned")
    slot
  slot(v-else)
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/Popover.json';
import { Scrollable } from '@/components/Scrollable';
import { Section } from '../Section';

@Component({
  components: {
    Scrollable,
    Section,
  },
})
export default class Pane extends Vue {
  @Prop({ type: Boolean }) public fixed?: boolean;

  @Prop({ type: Boolean }) public sectioned?: boolean;

  get className() {
    return classNames(styles.Pane, this.fixed && styles['Pane-fixed']);
  }
}
</script>
