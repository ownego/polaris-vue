<template lang="pug">
div(:class="styles.ActionContainer")
  ListboxAction(
    :selected="active",
    :disabled="disabled",
    :value="content || ''",
  )
    div(:class="actionClassNames")
      div(:class="styles.Content")
        div(v-if="prefix", :class="styles.Prefix")
          component(:is="prefix")
        div(v-else-if="icon", :class="styles.Prefix")
          Icon(:source="icon")
        div(
          v-else-if="image",
          role="presentation",
          :class="styles.Prefix",
          :style="{ backgroundImage: `url(${image})` }",
        )

        div(:class="styles.Text")
          div(:class="contentOverflowStyle") {{ contentText }}
          Text(
            v-if="helpText",
            tone="subdued",
            as="span",
          ) {{ helpText }}

        span(v-if="badge", :class="styles.Suffix")
          Badge(:tone="badge.tone") {{ badge.content }}

        span(v-if="suffix", :class="styles.Suffix")
          component(:is="suffix")

</template>

<script setup lang="ts">
import { type ComputedRef, computed, provide } from 'vue';
import type { ActionListItemDescriptor } from '@/utilities/types';
import { classNames } from '@/utilities/css';
import type { MappedActionContextType } from '@/utilities/auto-complete';
import useI18n from '@/use/useI18n';
import { Badge, ListboxAction, Icon, Text } from '@/components';

import styles from '@polaris/components/Autocomplete/components/MappedAction/MappedAction.module.scss';

interface MappedActionProps extends ActionListItemDescriptor {
  wrapOverflow?: boolean;
}

const props = withDefaults(defineProps<MappedActionProps>(), {
  wrapOverflow: false,
});

const emits = defineEmits<{
  action: [];
}>();

const i18n = useI18n();

const context = computed(() => ({
  role: props.role,
  url: props.url,
  external: props.external,
  destructive: props.destructive,
  onAction,
}));

const actionClassNames = computed(() => classNames(
  styles.Action,
  props.disabled && styles.disabled,
  props.destructive && styles.destructive,
  props.active && styles.selected,
));

const contentOverflowStyle = computed(() => props.wrapOverflow ? styles.ContentWrap : undefined);

const contentText = computed(() => {
  return props.ellipsis && props.content
    ? i18n.translate('Polaris.Autocomplete.ellipsis', { content: props.content })
    : props.content;
});

const onAction = () => {
  emits('action');
};

provide<ComputedRef<MappedActionContextType>>('mapped-action', context);
</script>
