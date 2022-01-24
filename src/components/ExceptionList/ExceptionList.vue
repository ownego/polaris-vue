<template lang="pug">
ul(v-if="items.length", :class="className")
  li(
    v-for="item, index in items",
    v-if="item.title || $slots[`item-${index}`]",
    :key="index",
    :class="classItem(item.status)",
  )
    span(:class="classIcon")
      Icon(v-if="item.icon", :source="item.icon")
      span(v-else, :class="classBullet")
    Truncate(v-if="item.truncate")
      span(
        v-if="item.title",
        :class="classTitle",
      )
        | {{ item.title }}
      span(
        v-if="$slots[`item-${index}`]",
        :class="classDescription",
      )
        slot(:name="`item-${index}`")
    template(v-else)
      span(
        v-if="item.title",
        :class="classTitle",
      )
        | {{ item.title }}
      span(
        v-if="$slots[`item-${index}`]",
        :class="classDescription",
      )
        slot(:name="`item-${index}`")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import type { IconSource } from 'types/type';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ExceptionList.json';
import { Icon } from '../Icon';
import { Truncate } from '../Truncate';

interface Item {
  /** Set the color of the icon and title for the given item. */
  status?: 'critical' | 'warning';
  /** Icon displayed by the list item */
  icon?: IconSource;
  /** Text displayed beside the icon */
  title?: string;
  /** Should the description be truncated at end of line */
  truncate?: boolean;
}

@Component({
  components: {
    Icon,
    Truncate,
  },
})
export default class ExceptionList extends Vue {
  /** Collection of items for list */
  @Prop({ type: Array, default: [] })
  public items!: Item[];

  public className = styles.ExceptionList;

  public classIcon = styles.Icon;

  public classBullet = styles.Bullet;

  public classTitle = styles.Title;

  public classDescription = styles.Description;

  public classItem = (status?: 'critical' | 'warning') => classNames(
    styles.Item,
    status && styles[variationName('status', status) as keyof typeof styles],
  );
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ExceptionList/ExceptionList.scss';
</style>
