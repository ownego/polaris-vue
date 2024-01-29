<template lang="pug">
Box(
  width="100%",
  :background="backgroundColor",
  :padding="200",
  :borderRadius="200",
  :color="textColor",
)
  InlineStack(
    align="space-between",
    blockAlign="start",
    :wrap="false",
    :gap="200",
  )
    InlineStack(:gap="150", :wrap="false")
      template(v-if="bannerIcon")
        component(:is="bannerIcon")
      Box(width="100%")
        BlockStack(:gap="200")
          BlockStack(:gap="50")
            template(v-if="bannerTitle")
              component(:is="bannerTitle")
            slot
          template(v-if="actionButtons")
            component(:is="actionButtons")
    template(v-if="dismissButton")
      component(:is="dismissButton")
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import type { BannerLayoutProps } from '../types';

type BannerWithinContentContainerSlots = {
  default: (_: VueNode) => any;
};

defineSlots<BannerWithinContentContainerSlots>();

defineProps<BannerLayoutProps & {
  bannerTitle?: (_: VueNode) => any;
  bannerIcon?: (_: VueNode) => any;
  actionButtons?: (_: VueNode) => any;
  dismissButton?: (_: VueNode) => any;
}>();
</script>
