<template lang="pug">
ul(:class="styles.ExceptionList")
  li(
    v-for="item, index in items",
    :key="index",
    :class="itemClasses(item)",
  )
    span(:class="styles.Icon")
      Icon(v-if="item.icon", :source="item.icon")
      span(v-else, :class="styles.Bullet")
    Truncate(v-if="item.truncate")
      span(
        v-if="item.title", 
        :class="styles.Title",
      ) {{ item.title }}
      span(
        v-if="item.description",
        :class="styles.Description",
      ) {{ item.description }}
    template(v-else)
      span(
        v-if="item.title", 
        :class="styles.Title",
      ) {{ item.title }}
      span(
        v-if="item.description",
        :class="styles.Description",
      ) {{ item.description }}
</template>

<script setup lang="ts">
import type { VueNode } from '@/utilities/types';
import { classNames, variationName } from '@/utilities/css';
import styles from '@polaris/components/ExceptionList/ExceptionList.module.scss';
import type { Item, ExceptionListProps } from './types';

defineSlots<{
  /** The content to display inside the link */
  default: (_: VueNode) => null;
}>();

defineProps<ExceptionListProps>();

const itemClasses = (item: Item) => classNames(
  styles.Item, item.status && styles[variationName('status', item.status)],
);
</script>
