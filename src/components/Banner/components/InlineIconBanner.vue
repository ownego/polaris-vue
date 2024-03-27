<template lang="pug">
Box(
  width="100%",
  borderRadius="300",
  :padding="300",
)
  InlineStack(
    align="space-between",
    :blockAlign="blockAlign",
    :wrap="false",
  )
    Box(width="100%")
      InlineStack(
        :gap="200",
        :wrap="false",
        :blockAlign="blockAlign",
      )
        div(v-if="bannerIcon", ref="iconNode")
          Box(
            borderRadius="200",
            :background="backgroundColor",
            :padding="100",
          )
            component(:is="bannerIcon")
        Box(ref="contentNode", width="100%")
          BlockStack(:gap="200")
            slot
            template(v-if="actionButtons")
              component(:is="actionButtons")
    div(
      ref="dismissIconNode",
      :class="styles.DismissIcon",
    )
      template(v-if="dismissButton")
        component(:is="dismissButton")
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import styles from '@polaris/components/Banner/Banner.module.css';
import type { VueNode } from '@/utilities/types';
import type { BannerLayoutProps } from '../types';
import type { InlineStackProps } from '../../InlineStack/types';

type BannerLayoutSlots = {
  default: (_: VueNode) => any;
};

defineSlots<BannerLayoutSlots>();

defineProps<BannerLayoutProps & {
  bannerIcon?: (_: VueNode) => any;
  actionButtons?: (_: VueNode) => any;
  dismissButton?: (_: VueNode) => any;
}>();

const blockAlign = ref<InlineStackProps['blockAlign']>('center');
const contentNode = ref<HTMLDivElement | null>(null);
const iconNode = ref<HTMLDivElement | null>(null);
const dismissIconNode = ref<HTMLDivElement | null>(null);

const handleResize = () => {
  const contentHeight = contentNode.value?.offsetHeight;
  const iconBoxHeight =
    iconNode.value?.offsetHeight || dismissIconNode.value?.offsetHeight;

  if (!contentHeight || !iconBoxHeight) return;

  contentHeight > iconBoxHeight
    ? blockAlign.value = 'start'
    : blockAlign.value = 'center';
}

onMounted(() => {
  handleResize();

  watch(handleResize, () => handleResize());

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
