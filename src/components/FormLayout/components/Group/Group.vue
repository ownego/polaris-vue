<template lang="pug">
div(
  role="group",
  :class="className",
  :aria-labelledby="titleId",
  :aria-describedby="helpTextId",
)
  div(
    v-if="$slots.title",
    :id="titleId",
    :class="classTitle",
  )
    slot(name="title")
  div(:class="classItems")
    slot
  div(
    v-if="$slots['help-text']",
    :id="helpTextId",
    :class="classHelpText",
  )
    slot(name="help-text")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/FormLayout.json';
import { useUniqueId } from '@/utilities/unique-id';
import { Item } from '../Item';

@Component({
  components: {
    Item,
  },
})
export default class Group extends Vue {
  @Prop({ type: Boolean })
  public condensed?: boolean;

  public id = useUniqueId('FormLayoutGroup');

  public helpTextId = `${this.id}HelpText`;

  public titleId = `${this.id}Title`;

  public classHelpText = classNames(styles.HelpText);

  public classTitle = classNames(styles.Title);

  public classItems = classNames(styles.Items);

  get className() {
    return classNames(this.condensed ? styles.condensed : styles.grouped);
  }
}
</script>
