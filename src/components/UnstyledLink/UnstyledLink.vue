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
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue';
import useLink from '@/use/useLink';
import { unstyled } from '@/components/shared';
import type { LinkLikeComponentProps } from '@/utilities/link';

export interface UnstyledLinkProps extends LinkLikeComponentProps {}

const attrs = useAttrs();

const LinkComponent = useLink();

const props = defineProps<UnstyledLinkProps>()

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
  return props.target ? `target="${props.target}"` : undefined;
});

const rel = computed(() => {  
  return props.target === '_blank' ? 'noopener noreferrer' : undefined;
});
</script>
