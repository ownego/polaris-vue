<template lang="pug">
li(v-if="hasMultipleSections", :class="className", role="presentation")
  SectionMarkup(
    :section="section",
    :hasMultipleSections="hasMultipleSections",
    :actionRole="actionRole",
    :firstSection="firstSection",
    @action-any-item="$emit('action-any-item')",
  )
    template(v-for="item, itemIndex in section.items")
      slot(:name="`prefix-${itemIndex}`", :slot="`prefix-${itemIndex}`")
      slot(:name="`suffix-${itemIndex}`", :slot="`suffix-${itemIndex}`")
SectionMarkup(
  v-else,
  :section="section",
  :hasMultipleSections="hasMultipleSections",
  :actionRole="actionRole",
  :firstSection="firstSection",
  @action-any-item="$emit('action-any-item')",
)
  template(v-for="item, itemIndex in section.items")
    slot(:name="`prefix-${itemIndex}`", :slot="`prefix-${itemIndex}`")
    slot(:name="`suffix-${itemIndex}`", :slot="`suffix-${itemIndex}`")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SectionMarkup from './SectionMarkup.vue';
import { ActionListSection } from '../../utils';
import styles from '@/classes/ActionList.json';

@Component({
  components: {
    SectionMarkup,
  },
})
export default class Section extends Vue {
  @Prop() public section!: ActionListSection;

  @Prop({ type: Boolean }) public hasMultipleSections!: boolean;

  @Prop({ type: String }) public actionRole?: 'option' | 'menuitem' | string;

  @Prop({ type: Boolean }) public firstSection?: boolean;

  public className = styles.Section;
}
</script>
