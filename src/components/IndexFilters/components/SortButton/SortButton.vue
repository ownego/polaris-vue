<template lang="pug">
Popover(
  fluid-content,
  autofocus-target="first-node",
  preferred-alignment="right",
  :active="active && !disabled",
  @close="handleClose",
)
  template(#activator)
    Tooltip(
      preferred-position="above",
      :content="i18n.translate('Polaris.IndexFilters.SortButton.tooltip')",
      :hover-delay="400"
    )
    Button(
      size="slim",
      :icon="SortIcon",
      :disabled="disabled",
      :accessibility-label="i18n.translate('Polaris.IndexFilters.SortButton.ariaLabel')",
      @click="handleClick",
    )
  Box(
    min-width="148px",
    padding-inline-start="300",
    padding-inline-end="300",
    padding-block-start="200",
    padding-block-end="200",
    border-block-end-width="025",
    border-color="border-secondary",
  )
    ChoiceList(
      v-model="selected",
      :title="i18n.translate('Polaris.IndexFilters.SortButton.title')",
      :choices="choiceListChoices",
      @change="handleChangeChoiceList",
    )
  Box(
    padding-inline-start="300",
    padding-inline-end="150",
    padding-block-start="200",
    padding-block-end="200",
  )
    DirectionButton(
      direction="asc",
      :active="selectedDirection === SortButtonDirection.ASC",
      :value="selectedChoices?.[0]?.value",
      @click="handleChangeDirection",
    ) {{ selectedChoices?.[0]?.directionLabel }}
    DirectionButton(
      direction="desc",
      :active="selectedDirection === SortButtonDirection.DESC",
      :value="selectedChoices?.[1]?.value",
      @click="handleChangeDirection",
    ) {{ selectedChoices?.[1]?.directionLabel }}

</template>

<script>
export enum SortButtonDirection {
  ASC = 'asc',
  DESC = 'desc',
}
</script>

<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue';
import useI18n from '@/use/useI18n';
import {
  Popover,
  ChoiceList,
  Tooltip,
  Box,
  Button,
} from '@/components';
import { DirectionButton } from './components';
import type { ChoiceListProps } from '@/components/ChoiceList/types';
import type { SortButtonChoice } from '../../types';
import SortIcon from '@icons/SortIcon.svg';

interface SortButtonProps {
  choices: SortButtonChoice[];
  selected: string[];
  disabled?: boolean;
}

type SortButtonEvents = {
  'change': [selected: string[]],
  'change-key': [key: string],
  'change-direction': [direction: string],
};

const props = defineProps<SortButtonProps>();
const emits = defineEmits<SortButtonEvents>();

const i18n = useI18n();
const currentInstance = getCurrentInstance();

const active = ref(false);
const [selectedValueKey, selectedDirection] = props.selected[0].split(' ');

 const choiceListChoices = computed(() => {
    const choiceCategories = props.choices.reduce(
      (acc: ChoiceListProps['choices'], curr) => {
        const alreadyExists = acc.some((option) => option.label === curr.label);
        const [, currentValueDirection] = curr.value.split(' ');
        const isSameDirection = currentValueDirection === selectedDirection;
        if (!alreadyExists) {
          return [...acc, curr];
        }
        if (isSameDirection) {
          return acc.map((option) => {
            if (option.label === curr.label) {
              return curr;
            }
            return option;
          });
        }
        return acc;
      },
      [],
    );
    return choiceCategories;
  });

const selectedChoices = computed(() => {
  return props.choices.filter((choice) => {
    const [currentKey] = choice.value.split(' ');
    return currentKey === selectedValueKey;
  });
});

function handleClick() {
  active.value = !active.value;
}

function handleClose() {
  active.value = false;
}

function handleChangeChoiceList($el: string[]) {
  if (currentInstance?.attrs.onChangeKey) {
    const [key] = $el[0].split(' ');
    emits('change-key', key);
  } else {
    emits('change', $el);
  }
}

function handleChangeDirection($el: string[]) {
  if (currentInstance?.attrs.onChangeDirection) {
    const [, direction] = $el[0].split(' ');
    emits('change-direction', direction);
  } else {
    emits('change', $el);
  }
}

</script>
