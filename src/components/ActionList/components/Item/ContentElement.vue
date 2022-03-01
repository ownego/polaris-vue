<template lang="pug">
span(:class="styles.Content")
  span(v-if="prefixId", :class="styles.Prefix")
    slot(name="prefix")
  span(v-else-if="icon", :class="styles.Prefix")
    Icon(:source="icon")
  span(
    v-else-if="image",
    :class="styles.Prefix",
    role="presentation",
    :style="{backgroundImage: `url(${image}`}"
  )
  span(:class="styles.Text")
    span(
      v-if="helpText",
      :class="styles.ContentBlock"
    )
      span(:class="styles.ContentBlockInner") {{ contentText }}
      TextStyle(variation="subdued") {{ helpText }}
    template(v-else) {{ contentText }}
  span(v-if="badge", :class="styles.Suffix")
    Badge(:status="badge.status") {{ badge.content }}
  span(v-if="suffixId", :class="styles.Suffix")
    slot(name="suffix")
</template>

<script setup lang="ts">
// TODO: update badge
import { computed } from 'vue';
import { TextStyle } from '@/components/TextStyle';
import { Icon } from '@/components/Icon';
// import { Badge } from '@/components/Badge';
import styles from '@/classes/ActionList.json';
import type { IconableAction, DisableableAction, BadgeAction, DestructableAction } from '@/utilities/interface';

interface ActionListItemDescriptor extends IconableAction, DisableableAction, BadgeAction, DestructableAction {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Additional hint text to display with item */
  helpText?: string;
  /** Image source */
  image?: string;
  /** Prefix source */
  prefixId?: string;
  /** Suffix source */
  suffixId?: string;
  /**  Add an ellipsis suffix to action content */
  ellipsis?: boolean;
  /** Whether the action is active or not */
  active?: boolean;
  /** Defines a role for the action */
  role?: string;
}

const props = defineProps<ActionListItemDescriptor>();

const contentText = computed(() => (props.ellipsis && props.content ? `${props.content}…` : props.content));
</script>
