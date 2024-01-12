<template lang="pug">
button(
  v-if="hasEventClick",
  type="button",
  :disabled="disabled",
  :class="className",
  @click="emits('click')",
)
  slot
span(
  v-else,
  :class="className",
)
  a(
    v-if="url && !disabled",
    :class="classLink",
    :href="url",
  )
    span(
      :title="tagTitle",
      :class="styles.LinkText",
    )
      slot
  span(
    v-else,
    :title="tagTitle",
    :class="styles.TagText",
  )
    slot
  button(
    v-if="hasEventRemove",
    type="button",
    :aria-label="ariaLabel",
    :class="classRemove",
    :disabled="disabled",
    @click="emits('remove')",
    @mouseup="onMouseUp",
  )
    Icon(:source="CancelSmallMinor")
</template>

<script setup lang="ts">
import { computed, useCssModule, getCurrentInstance } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import CancelSmallMinor from '@icons/CancelSmallMinor.svg';

const styles = useCssModule();
const currentInstance = getCurrentInstance();

const slots = defineSlots<{
  /** Elements to display inside the tag*/
  default: (_?: VueNode) => any;
}>()

export type TagProps = {
  /** Disables the tag  */
  disabled?: boolean;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  url?: string;
}

const props = withDefaults(defineProps<TagProps>(), {
  disabled: false,
});

const emits = defineEmits<{
  /** Callback when remove button is clicked or keypressed. */
  'remove': [];
  /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
  'click': [];
}>();

// Computed
const hasEventClick = computed(() => Boolean(currentInstance?.vnode.props?.onClick));
const hasEventRemove = computed(() => Boolean(currentInstance?.vnode.props?.onRemove));
const segmented = computed(() => hasEventClick.value && props.url);

const className = computed(() => {
  return classNames(
    styles.Tag,
    props.disabled && styles.disabled,
    hasEventClick.value && styles.clickable,
    hasEventRemove.value && styles.removable,
    props.url && !props.disabled && styles.linkable,
    segmented.value && styles.segmented,
  );
});

const classLink = computed(() => classNames(styles.Link, segmented.value && styles.segmented));

const classRemove = computed(() => classNames(styles.Button, segmented.value && styles.segmented));

const tagTitle = computed(() => {
  if (props.accessibilityLabel) {
    return props.accessibilityLabel;
  }

  if (slots.default && slots.default()[0].children) {
    return slots.default()[0].children as string;
  }

  return '';
});

const ariaLabel = computed(() => {
  return `Remove ${tagTitle.value || ''}`;
});

/**
 * Methods
 */
const onMouseUp = handleMouseUpByBlurring;
</script>

<style lang="scss" module>
@import '@polaris/components/Tag/Tag.module.scss';
</style>
