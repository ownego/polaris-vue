<template lang="pug">
div(:class="styles.ActionContainer")
  ListboxAction(
    :selected="active",
    :disabled="disabled",
    :value="content || ''",
  )
    div(:class="actionClassNames")
      div(:class="styles.Content")
        div(v-if="hasSlot(slots.prefix)", :class="styles.Prefix")
          slot(name="prefix")
        div(v-else-if="icon", :class="styles.Prefix")
          Icon(:source="icon")
        div(
          v-else-if="image",
          role="presentation",
          :class="styles.Prefix",
          :style="{ backgroundImage: `url(${image})`}",
        )
        div(:class="styles.Text")
          div(:class="contentOverflowStyle")
            template(
              v-if="ellipsis && content",
            ) {{ i18n.translate('Polaris.Autocomplete.ellipsis', {content}) }}
            template(v-else) {{ content }}
          TextStyle(v-if="hasSlot(slots.helpText)", variation="subdued")
            slot(name="helpText")
        span(v-if="badge", :class="styles.Suffix")
          Badge(:status="badge.status") {{ badge.content }}
        span(
          v-if="hasSlot(slots.suffix)",
          :class="styles.Suffix",
        )
          slot(name="suffix")
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { UseI18n } from '@/use';
import type { IconSource } from '@/utilities/type';
import { hasSlot } from '@/utilities/has-slot';
import { Badge, ListboxAction, Icon, TextStyle } from '@/components';
import styles from '@/classes/Autocomplete-MappedAction.json';

interface Props {
  active?: boolean;
  content?: string;
  disabled?: boolean;
  icon?: IconSource;
  image?: string;
  ellipsis?: boolean;
  role?: string;
  url?: string;
  external?: boolean;
  destructive?: boolean;
  badge?: {
    status: 'new';
    content: string;
  };
  wrapOverflow?: boolean;
  onAction?(): void;
}

const props = withDefaults(defineProps<Props>(), {
  wrapOverflow: false,
});

const slots = useSlots();
const i18n = UseI18n();

const actionClassNames = computed(() => classNames(
  styles.Action,
  props.disabled && styles.disabled,
  props.destructive && styles.destructive,
  props.active && styles.selected,
));

const contentOverflowStyle = computed(() => props.wrapOverflow ? styles.ContentWrap : undefined);

provide('MappedActionContext', {
  role: props.role,
  url: props.url,
  external: props.external,
  destructive: props.destructive,
  onAction: props.onAction,
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Autocomplete/components/MappedAction/MappedAction.scss';
</style>
