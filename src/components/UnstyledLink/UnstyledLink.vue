<template lang="pug">
component(
  v-if="LinkComponent",
  :is="LinkComponent",
  v-bind="{ ...attrs, ...unstyled.props, ...props }",
)

a(
  v-else,
  :target="target",
  :href="url"
  :rel="rel",
  v-bind="{ ...attrs, ...linkProps.rest, ...unstyled.props }",
)
  slot
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue';
import useLink from '@/use/useLink';
import { unstyled } from '@polaris/components/shared';
import type { LinkLikeComponentProps } from '@/utilities/link';
import type { VueNode } from '@/utilities/types';

export type UnstyledLinkProps = {} & LinkLikeComponentProps

export type UnstyledLinkSlots = {
  /** The content to display inside the link */
  default: (_: VueNode) => null;
}

const attrs = useAttrs();

const LinkComponent = useLink();

const props = defineProps<UnstyledLinkProps>();

const linkProps = computed(() => {
  const {
    external,
    url,
    target,
    ...rest
  } = props;

  return {
    external,
    url,
    rest,
  };
});

const target = computed(() => {
  if (props.external) {
    return '_blank';
  }

  return props.target ?? undefined;
});

const rel = computed(() => {
  return target.value === '_blank' ? 'noopener noreferrer' : undefined;
});
</script>
