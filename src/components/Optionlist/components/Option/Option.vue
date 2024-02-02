<template lang="pug">
li(
  :key="id",
  :class="styles.Option",
  :tabIndex="-1"
  @pointer-enter="handlePointerEnter",
)
  ScrollTo(v-if="active")
  label(
    v-if="allowMultiple"
    :htmlFor="id"
    :class="multiSelectClassName",
  )
    div(:class="styles.Checkbox")
      PolarisCheckbox(
        label="",
        :ariaDescribedBy="`${id}-label`",
        :id="id",
        :checked="select",
        :disabled="disabled",
        :model-value="select",
        @change="handleClick"
      )
    div(
      v-if="slots.media",
      :class="styles.Media",
    )
      slot(name="media")
    span(:id="`${id}-label`")
      slot(name="label")
  button(
    v-else,
    :id="id",
    type="button",
    :class="singleSelectClassName",
    :disabled="disabled",
    :aria-pressed="active || select",
    @click="handleClick",
    @focus="handleFocus",
    @blur="toggleFocused",
  )
    InlineStack(:wrap="false", :block-align="verticalAlignToBlockAlign(verticalAlign)")
      div(
        v-if="slots.media",
        :class="styles.Media",
      )
        slot(name="media")
      span(:id="`${id}-label`")
        slot(name="label")
    span(:class="styles.Icon")
      Icon(:source="CheckIcon")
</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
import { classNames, variationName } from '@/utilities/css';
import { type VueNode } from '@/utilities/types';
import { useToggle } from '@/use/useToggle';
import {
  ScrollTo,
  InlineStack,
  Icon,
  Checkbox as PolarisCheckbox,
} from '@/components';
import type { InlineStackProps } from '@/components/InlineStack/types';
import type { IconProps } from '@/components/Icon/Icon.vue';
import type { AvatarProps } from '@/components/Avatar/utils';
import type { ThumbnailProps } from '@/components/Thumbnail/Thumbnail.vue';
import CheckIcon from '@icons/CheckIcon.svg';
import styles from '@polaris/components/OptionList/components/Option/Option.module.scss';

type Alignment = 'top' | 'center' | 'bottom';

export interface OptionProps {
  id: string;
  value: string;
  section: number;
  index: number;
  media?: IconProps | AvatarProps | ThumbnailProps;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  verticalAlign?: Alignment;
}

type OptionEvents = {
  'click': [section: number, option: number];
  /** Callback when pointer enters the option */
  'pointer-enter': [section: number, option: number];
  /** Callback when option is focused */
  'focus': [section: number, option: number];
};

const props = defineProps<OptionProps>();
const emits = defineEmits<OptionEvents>();
const slots = defineSlots<{
  label?: (_?: VueNode) => VNode[];
  media?: (_?: VueNode) => VNode[];
}>();

const {
  value: focused,
  toggle: toggleFocused,
} = useToggle(false);

const singleSelectClassName = computed(() => {
  return classNames(
    styles.SingleSelectOption,
    focused.value && styles.focused,
    props.disabled && styles.disabled,
    props.select && styles.select,
    props.active && styles.active,
    props.verticalAlign && styles[variationName('verticalAlign', props.verticalAlign)],
  );
});
const multiSelectClassName = computed(() => {
  return classNames(
    styles.Label,
    props.disabled && styles.disabled,
    props.active && styles.active,
    props.select && styles.select,
    props.verticalAlign && styles[variationName('verticalAlign', props.verticalAlign)],
    props.allowMultiple && styles.CheckboxLabel,
    props.allowMultiple && styles.MultiSelectOption,
  );
});

const handleClick = () => {
  if (props.disabled) return;
  emits('click', props.section, props.index);
};

const handlePointerEnter = () => {
  if (props.disabled) return;
  emits('pointer-enter', props.section, props.index);
};

const handleFocus = () => {
  toggleFocused();

  emits('focus', props.section, props.index);
}

function verticalAlignToBlockAlign(
  verticalAlign?: Alignment,
): InlineStackProps['blockAlign'] {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}
</script>
