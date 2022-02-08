<template lang="pug">
Option(
  :value="value",
  :selected="selected",
  :disabled="disabled",
  :divider="divider",
)
  div(:class="className")
    TextOption(:selected="selected", :disabled="disabled")
      div(v-if="icon", :class="iconClassName")
        Icon(color="subdued", :source="icon")
      slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Provide } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import type { IconSource } from 'types/type';
import styles from '@/classes/Listbox-Action.json';
import { Icon } from '../../../Icon';
import { Option, OptionProps } from '../Option';
import { TextOption } from '../TextOption';

@Component({
  components: {
    Option,
    TextOption,
    Icon,
  },
})
export default class Action extends Vue {
  @Provide() actionContext = true;

  @Prop({ type: [String, Object, Function] })
  public icon?: IconSource;

  @Prop({ type: String, required: true })
  public value!: OptionProps['value'];

  @Prop({ type: Boolean })
  public selected?: OptionProps['selected'];

  @Prop({ type: Boolean })
  public disabled?: OptionProps['disabled'];

  @Prop({ type: Boolean })
  public divider?: OptionProps['divider'];

  public iconClassName: string = styles.Icon;

  get className(): string {
    return classNames(
      styles.Action,
      this.divider && styles.ActionDivider,
    );
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Action/Action.scss';
</style>
