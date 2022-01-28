<template lang="pug">
li(:class="classItem(status)")
  span(:class="classIcon")
    Icon(v-if="icon", :source="icon")
    span(v-else, :class="classBullet")
  Truncate(v-if="truncate")
    span(
      v-if="title",
      :class="classTitle",
    ) {{ title }}
    span(
      v-if="$slots.default",
      :class="classDescription",
    )
      slot
  template(v-else)
    span(
      v-if="title",
      :class="classTitle",
    ) {{ title }}
    span(
      v-if="$slots.default",
      :class="classDescription",
    )
      slot
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import type { IconSource } from 'types/type';
import { classNames, variationName } from 'polaris-react/src/utilities/css';
import styles from '@/classes/ExceptionList.json';
import { Icon } from '../Icon';
import { Truncate } from '../Truncate';

@Component({
  components: {
    Icon,
    Truncate,
  },
})
export default class ExceptionList extends Vue {
  /** Set the color of the icon and title for the given item. */
  @Prop({ type: String })
  public status?: 'critical' | 'warning';

  /** Icon displayed by the list item */
  @Prop({ type: [String, Object, Function] })
  public icon?: IconSource;

  /** Text displayed beside the icon */
  @Prop({ type: String })
  public title?: string;

  /** Should the description be truncated at end of line */
  @Prop({ type: Boolean })
  public truncate?: boolean;

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
