<template lang="pug">
span(:class="contentClass")
  span(v-if="prefixId", :class="prefixClass")
    slot(name="prefix")
  span(v-else-if="icon", :class="prefixClass")
    Icon(:source="icon")
  span(
    v-else-if="image",
    :class="prefixClass",
    role="presentation",
    :style="{backgroundImage: `url(${image}`}"
  )
  span(:class="textClass")
    span(
      v-if="helpText",
      :class="contentBlockClass"
    )
      span(:class="contentBlockInnerClass") {{ contentText }}
      TextStyle(variation="subdued") {{ helpText }}
    template(v-else) {{ contentText }}
  span(v-if="badge", :class="suffixClass")
    Badge(:status="badge.status") {{ badge.content }}
  span(v-if="suffixId", :class="suffixClass")
    slot(name="suffix")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ItemProps } from '../../utils';
import { TextStyle } from '@/components/TextStyle';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import styles from '@/classes/ActionList.json';

@Component({
  components: {
    Icon,
    TextStyle,
    Badge,
  },
})
export default class ContentElement extends Vue {
  @Prop() public badge?: ItemProps['badge'];

  @Prop() public content?: ItemProps['content'];

  @Prop() public helpText?: ItemProps['helpText'];

  @Prop() public icon?: ItemProps['icon'];

  @Prop() public prefixId?: ItemProps['prefixId'];

  @Prop() public suffixId?: ItemProps['suffixId'];

  @Prop() public image?: ItemProps['image'];

  @Prop() public disabled?: ItemProps['disabled'];

  @Prop() public ellipsis?: ItemProps['ellipsis'];

  @Prop() public role?: ItemProps['role'];

  get contentText() {
    return this.ellipsis && this.content ? `${this.content}…` : this.content;
  }

  public contentClass = styles.Content;

  public prefixClass = styles.Prefix;

  public suffixClass = styles.Suffix;

  public textClass = styles.Text;

  public contentBlockClass = styles.ContentBlock;

  public contentBlockInnerClass = styles.ContentBlockInner;
}
</script>
