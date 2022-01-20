<template lang="pug">
li(v-if="hasMultipleSections", :class="className", role="presentation")
  SectionMarkup(
    v-bind="sectionMarkupProps",
    @action-any-item="$emit('action-any-item')",
  )
    template(v-for="{prefixId, suffixId} in section.items")
        slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
        slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
SectionMarkup(
  v-else,
  v-bind="sectionMarkupProps",
  @action-any-item="$emit('action-any-item')",
)
  template(v-for="{prefixId, suffixId} in section.items")
    slot(v-if="prefixId", :name="`prefix-${prefixId}`", :slot="`prefix-${prefixId}`")
    slot(v-if="suffixId", :name="`suffix-${suffixId}`", :slot="`suffix-${suffixId}`")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import styles from '@/classes/ActionList.json';
import SectionMarkup from './SectionMarkup.vue';
import { ActionListSection } from '../../utils';

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

  get sectionMarkupProps() {
    const {
      section, hasMultipleSections, actionRole, firstSection,
    } = this;
    return {
      section, hasMultipleSections, actionRole, firstSection,
    };
  }
}
</script>
