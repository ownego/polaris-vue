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

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { TextStyle } from '@/components/TextStyle';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import styles from '@/classes/ActionList.json';
import type { IconSource } from 'types/type';

interface Props {
  id?: string;
  content?: string;
  url?: string;
  external?: boolean;
  badge?: {
    status: 'new';
    content: string;
  };
  destructive?: boolean;
  disabled?: boolean;
  icon?: IconSource;
  accessibilityLabel?: string;
  helpText?: string;
  image?: string;
  prefixId?: string;
  suffixId?: string;
  ellipsis?: boolean;
  active?: boolean;
  role?: string;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
}

const props = defineProps<Props>();

const contentText = computed(() => (props.ellipsis && props.content ? `${props.content}…` : props.content));
</script>
