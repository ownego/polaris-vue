<template lang="pug">
//- ScrollMarkup
ScrollTo(v-if="active")

//- Control
UnstyledLink(
  v-if="url",
  :id="id",
  :url="disabled ? null : url",
  :class="className",
  :external="external",
  :role="role",
  :aria-label="accessibilityLabel",
  @click="disabled ? null : emit('action')",
)
  Box(width="100%")
    InlineStack(
      block-align="center",
      gap="150",
      :wrap="!truncate",
    )
      //- PrefixMarkup
      span(
        v-if="prefixId",
        :className="styles.Prefix",
      )
        slot(name="prefix")

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
      Box(v-if="suffixId")
        span(:className="styles.Suffix")
          slot(name="suffix")
button(
  v-else,
  :id="id",
  type="button",
  :class="className",
  :disabled="disabled",
  :role="role",
  :aria-label="accessibilityLabel",
  @click="emit('action')",
  @mouseup="handleMouseUpByBlurring",
  @mouseenter="onMouseEnter",
)
  Box(width="100%")
    InlineStack(
      block-align="center",
      gap="150",
      :wrap="!truncate",
    )
      //- PrefixMarkup
      span(
        v-if="prefixId",
        :className="styles.Prefix",
      )
        slot(name="prefix")

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
      Box(v-if="suffixId")
        span(:className="styles.Suffix")
          slot(name="suffix")
</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
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
const emit = defineEmits<{
  /** Callback when any item is clicked or keypressed */
  'action': [];
}>();
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
</script>
