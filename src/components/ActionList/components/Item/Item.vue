<template lang="pug">
li(:role="roleName")
  ScrollTo(v-if="active")
  UnstyledLink(
    v-if="url",
    :id="id",
    :url="disable ? null: url",
    :class="className",
    :external="external",
    :aria-label="accessibilityLabel",
    :role="role",
    @click="onClick",
  )
    ContentElement(v-bind="contentElementProps")
      slot(name="suffix", slot="suffix")
      slot(name="prefix", slot="prefix")
  button(
    v-else,
    :id="id",
    type="button",
    :class="className",
    :disabled="disabled",
    :aria-label="accessibilityLabel",
    :role="role",
    @click="onClick",
    @mouseup="onMouseUp",
  )
    ContentElement(v-bind="contentElementProps")
      slot(name="suffix", slot="suffix")
      slot(name="prefix", slot="prefix")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import { Scrollable } from '@/components/Scrollable';
import { ScrollTo } from '@/components/Scrollable/components/ScrollTo';
import { UnstyledLink } from '@/components/UnstyledLink';
import styles from '@/classes/ActionList.json';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import ContentElement from './ContentElement.vue';
import { ItemProps } from '../../utils';

@Component({
  components: {
    Scrollable,
    UnstyledLink,
    ContentElement,
    ScrollTo,
  },
})
export default class Item extends Vue {
  @Prop() public id?: ItemProps['id'];

  @Prop() public badge?: ItemProps['badge'];

  @Prop() public content?: ItemProps['content'];

  @Prop() public accessibilityLabel?: ItemProps['accessibilityLabel'];

  @Prop() public helpText?: ItemProps['helpText'];

  @Prop() public url?: ItemProps['url'];

  @Prop() public icon?: ItemProps['icon'];

  @Prop() public prefixId?: ItemProps['prefixId'];

  @Prop() public suffixId?: ItemProps['suffixId'];

  @Prop() public image?: ItemProps['image'];

  @Prop() public disabled?: ItemProps['disabled'];

  @Prop() public external?: ItemProps['external'];

  @Prop() public destructive?: ItemProps['destructive'];

  @Prop() public ellipsis?: ItemProps['ellipsis'];

  @Prop() public active?: ItemProps['active'];

  @Prop() public role?: ItemProps['role'];

  get className() {
    return classNames(
      styles.Item,
      this.disabled && styles.disabled,
      this.destructive && styles.destructive,
      this.active && styles.active,
    );
  }

  get contentElementProps() {
    return {
      badge: this.badge,
      content: this.content,
      helpText: this.helpText,
      icon: this.icon,
      prefixId: this.prefixId,
      suffixId: this.suffixId,
      image: this.image,
      disabled: this.disabled,
      ellipsis: this.ellipsis,
      role: this.role,
    };
  }

  get roleName() {
    return this.role === 'menuitem' ? 'presentation' : undefined;
  }

  public onMouseUp = handleMouseUpByBlurring;

  public onClick() {
    if (!this.disabled) {
      this.$emit('action');
    }
  }
}
</script>
