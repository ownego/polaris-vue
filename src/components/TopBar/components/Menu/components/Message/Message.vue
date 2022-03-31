<template lang="pug">
div(:class="styles.Section")
  PopoverSection
    Stack(
      vertical,
      spacing="tight",
    )
      TextContainer
        Heading
          | {{ title }}
          Badge(
            v-if="badge",
            :status="badge.status"
          )
            | {{ badge.content }}
        p {{ description }}

      Link(:url="link.to") {{ link.content }}

      Button(
        plain,
        @click="action.onClick",
      ) {{ action.content }}
</template>

<script setup lang="ts">
import styles from '@/classes/TopBar-Message.json';
import { PopoverSection, Stack, TextContainer, Heading, Badge, Link, Button } from '@/components';
import type { BadgeProps } from './utils';

interface MessageProps {
  title: string;
  description: string;
  action: { onClick(): void; content: string };
  link: { to: string; content: string };
  badge?: { content: string; status: BadgeProps['status'] };
}

const props = defineProps<MessageProps>();

</script>
<style lang="scss">
@import 'polaris-react/src/components/TopBar/components/Menu/components/Message/Message.scss';
</style>
