<template lang="pug">
component(
  v-if="LinkComponent",
  :is="LinkComponent",
  v-bind="{ ...unstyled.props, ...props }",
)

a(
  v-else,
  :target="target",
  :href="url"
  :rel="rel",
  v-bind="{ ...linkProps.rest, ...unstyled.props }",
)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useLink from '@/use/useLink';
import { unstyled } from '@/components/shared';
import { LinkLikeComponentProps } from '@/utilities/link';

export interface UnstyledLinkProps extends LinkLikeComponentProps {}

const props = defineProps<UnstyledLinkProps>();

const LinkComponent = useLink();

const linkProps = computed(() => {
  const {
    external,
    url,
    target: targetProp,
    ...rest,
  } = props;

  return {
    external,
    url,
    target: targetProp,
    ...rest,
  };
})

const target = computed(() => {
  if (props.external) {
    return '_blank';
  } else {
    return props.target ?? undefined;
  }
});

const rel = computed(() => {  
  return target.value === '_blank' ? 'noopener noreferrer' : undefined;
});
</script>
