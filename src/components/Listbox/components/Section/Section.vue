<template lang="pug">
li(
  role="presentation",
  v-bind="listboxSectionDataSelector",
)
  slot(name="title")
  ul(
    role="group",
    :aria-labelledby="sectionId",
    :class="classNames",
  )
    slot
</template>

<script lang="ts">
import {
  Mixins,
  Component,
  Prop,
  Provide,
} from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  listboxSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import styles from '@/classes/Listbox-Section.json';
import { UseUniqueId } from '@/mixins';

@Component
export default class Section extends Mixins(UseUniqueId) {
  @Provide() sectionContext = this.sectionId;

  @Prop({ type: Boolean, default: true })
  public divider?: boolean;

  public listboxSectionDataSelector = listboxSectionDataSelector;

  // eslint-disable-next-line class-methods-use-this
  get sectionId(): string {
    return this.useUniqueId('ListboxSection');
  }

  get className(): string {
    return classNames(
      styles.SectionGroup,
      !this.divider && styles.noDivider,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Section/Section.scss';
</style>
