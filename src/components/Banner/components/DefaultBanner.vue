<template lang="pug">
Box(width="100%")
  BlockStack(align="space-between")
    Box(
      :background="backgroundColor",
      :color="textColor",
      :borderStartStartRadius="breakpoints.smUp ? '300' : undefined",
      :borderStartEndRadius="breakpoints.smUp ? '300' : undefined",
      :borderEndStartRadius="!hasContent && breakpoints.smUp ? '300' : undefined",
      :borderEndEndRadius="!hasContent && breakpoints.smUp ? '300' : undefined",
      :padding="300",
    )
      InlineStack(
        align="space-between",
        blockAlign="center",
        :gap="200",
        :wrap="false",
      )
        InlineStack(:gap="100", :wrap="false")
          template(v-if="bannerIcon")
            component(:is="bannerIcon")
          template(v-if="bannerTitle")
            component(:is="bannerTitle")
        template(v-if="dismissButton")
          component(:is="dismissButton")
    Box(
      v-if="Boolean(hasContent)",
      :padding="{ xs: '300', md: '400'}",
      :paddingBlockStart="300",
    )
      BlockStack(:gap="200")
        slot
        template(v-if="actionButtons")
          component(:is="actionButtons")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { VueNode } from '@/utilities/types';
import { useBreakpoints } from '@/use/useBreakpoints';
import type { BannerLayoutProps } from '../types';

type DefaultBannerSlots = {
  default: (_: VueNode) => any;
};

const slots = defineSlots<DefaultBannerSlots>();

const props = defineProps<BannerLayoutProps & {
  bannerIcon?: (_: VueNode) => any;
  bannerTitle?: (_: VueNode) => any;
  actionButtons?: (_: VueNode) => any;
  dismissButton?: (_: VueNode) => any;
}>();

const breakpoints = useBreakpoints();

const hasContent = computed(() => slots.default || props.actionButtons);
</script>
