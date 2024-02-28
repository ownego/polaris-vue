<template lang="pug">
Tooltip(
  preferred-position="above",
  :hover-delay="400",
)
  template(#content)
    Text(
      as="span",
      variant="bodyMd",
      alignment="center",
    ) {{ tooltipContent }}
  div(:style="style")
    Button(
      size="slim",
      :disabled="disabled",
      :accessibility-label="label",
      @click="emits('click')",
    )
      template(#icon)
        InlineStack(gap="0")
          Icon(
            v-if="!hideQueryField",
            :source="SearchIcon",
            tone="base",
          )
          Icon(
            v-if="!hideFilters",
            :source="FilterIcon",
            tone="base",
          )
</template>

<script setup lang="ts">
import { type CSSProperties } from 'vue';
import {
  Icon,
  Tooltip,
  Text,
  InlineStack,
  Button,
} from '@/components';
import SearchIcon from '@icons/SearchIcon.svg';
import FilterIcon from '@icons/FilterIcon.svg';

type SearchFilterButtonProps = {
  label: string;
  disabled?: boolean;
  tooltipContent: string;
  hideFilters?: boolean;
  hideQueryField?: boolean;
  style: CSSProperties;
}

type SearchFilterButtonEvents = {
  'click': [];
}

defineProps<SearchFilterButtonProps>();
const emits = defineEmits<SearchFilterButtonEvents>();
</script>

