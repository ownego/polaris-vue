<template lang="pug">
//- ScrollMarkup
ScrollTo(v-if="active")

//- Control
component(
  :is="url ? UnstyledLink : 'button'",
  v-bind="url ? linkAttr : buttonAttr",
  @click="disabled ? null : onAction",
  @mouseup="url ? null : handleMouseUpByBlurring",
  @mouseenter="url ? null : onMouseEnter",
)
  Box(width="100%")
    InlineStack(
      block-align="center",
      gap="150",
      :wrap="!truncate",
    )
      //- PrefixMarkup
      span(
        v-if="slots.prefix || prefix",
        :className="styles.Prefix",
      )
        slot(v-if="slots.prefix", name="prefix")
        template(v-else) {{ prefix }}

      span(
        v-if="icon",
        :class="styles.Prefix",
      )
        Icon(:source="icon")
      span(
        v-if="image",
        role="presentation",
        :class="styles.Prefix",
        :style="{ backgroundImage: `url(${image})`}",
      )
      //- TextMarkup
      span(
        :className="styles.Text",
      )
        div(v-if="helpText")
          Box
            TruncateText(v-if="truncate && content") {{ content }}
            template(v-else-if="ellipsis") {{ `${content}...` }}
            template(v-else) {{ content }}
          Text(
            as="span",
            variant="bodySm",
            :tone="active || disabled ? undefined : 'subdued'",
          ) {{ helpText }}
        div(v-else)
          TruncateText(v-if="truncate && content") {{ content }}
          template(v-else-if="ellipsis") {{ `${content}...` }}
          template(v-else) {{ content }}
      //- BadgeMarkup
      span(
        v-if="badge",
        :class="styles.Suffix",
      )
        Badge(:tone="badge.tone") {{ badge.content }}
      //- SuffixMarkup
      Box(v-if="slots.suffix || suffix")
        span(:className="styles.Suffix")
          slot(v-if="slots.suffix", name="suffix")
          template(v-else) {{ suffix }}
</template>

<script setup lang="ts">
import {  VNode, computed } from 'vue';
import { classNames } from '@/utilities/css';
import { handleMouseUpByBlurring } from '@/utilities/focus';
import {
  Icon,
  ScrollTo,
  UnstyledLink,
  Badge,
  Text,
  InlineStack,
  Box,
} from '@/components';
import TruncateText from '../TruncateText.vue';
import type { ActionListItemDescriptor, VueNode } from '../../../../utilities/types';
import styles from '@polaris/components/ActionList/ActionList.module.scss';

type ItemProps = ActionListItemDescriptor;

const props = withDefaults(defineProps<ItemProps>(), {
  variant: 'default',
});

const slots = defineSlots<{
  default?: (_?: VueNode) => VNode[];
  /** Additional hint text to display with item */
  helpText?: (_?: VueNode) => VNode[];
  /** Prefix source */
  prefix?: (_?: VueNode) => VNode[];
  /** Suffix source */
  suffix?: (_?: VueNode) => VNode[];
}>();

const className = computed(() => classNames(
  styles.Item,
  props.disabled && styles.disabled,
  props.destructive && styles.destructive,
  props.active && styles.active,
  props.variant === 'default' && styles.default,
  props.variant === 'indented' && styles.indented,
  props.variant === 'menu' && styles.menu,
));
const buttonAttr = computed(() => {
  const { id, disabled, role, accessibilityLabel } = props;
  return {
    id,
    disabled,
    role,
    'aria-label': accessibilityLabel,
    type: 'button',
    class: className.value,
  };
});

const linkAttr = computed(() => {
  const { id, disabled, url, role, accessibilityLabel, external } = props;
  return {
    id,
    url: disabled ? null : url,
    role,
    external,
    'aria-label': accessibilityLabel,
    class: className.value,
  };
});
</script>
