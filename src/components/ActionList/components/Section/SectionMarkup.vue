<template lang="pug">
div(:class="className")
  p(v-if="section.title", :class="titleClass") {{ section.title }}
  ul(
    :class="actionsClass",
    :role="sectionRole",
    :tabIndex="!hasMultipleSections ? -1 : undefined"
  )
    Item(
      v-for="{content, helpText, onAction, ...item}, index in section.items",
      :key="`${content}-${index}`",
      :content="content",
      :helpText="helpText",
      :role="actionRole",
      v-bind="{...item}",
      @action="handleAction(onAction)",
    )
      slot(v-if="item.prefixId", :name="`prefix-${item.prefixId}`", slot="prefix")
      slot(v-if="item.suffixId", :name="`suffix-${item.suffixId}`", slot="suffix")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ActionList.json';
import { Item } from '../Item';
import { ActionListSection, ActionListItemDescriptor } from '../../utils';

@Component({
  components: {
    Item,
  },
})
export default class SectionMarkup extends Vue {
  @Prop() public section!: ActionListSection;

  @Prop({ type: Boolean }) public hasMultipleSections!: boolean;

  @Prop({ type: String }) public actionRole?: 'option' | 'menuitem' | string;

  @Prop({ type: Boolean }) public firstSection?: boolean;

  get className() {
    return this.section.title ? undefined : styles['Section-withoutTitle'];
  }

  get titleClass() {
    return classNames(
      styles.Title,
      this.firstSection && styles.firstSectionWithTitle,
    );
  }

  get sectionRole() {
    let sectionRole;

    switch (this.actionRole) {
    case 'option':
      sectionRole = 'presentation';
      break;
    case 'menuitem':
      sectionRole = !this.hasMultipleSections ? 'menu' : 'presentation';
      break;
    default:
      sectionRole = undefined;
      break;
    }

    return sectionRole;
  }

  public actionsClass = styles.Actions;

  public handleAction(onAction: ActionListItemDescriptor['onAction']) {
    if (onAction) {
      onAction();
    }
    this.$emit('action-any-item');
  }
}
</script>
