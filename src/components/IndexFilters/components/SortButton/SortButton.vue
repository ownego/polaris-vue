<template lang="pug">
Popover(
  fluid-content,
  autofocus-target="first-node",
  preferred-alignment="right",
  :active="active && !disabled",
  :z-index-override="disclosureZIndexOverride",
  @close="handleClose",
)
  template(#activator)
    Tooltip(
      preferred-position="above",
      :content="i18n.translate('Polaris.IndexFilters.SortButton.tooltip')",
      :hover-delay="400",
      :z-index-override="disclosureZIndexOverride",
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
      v-model="model",
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

<script setup lang="ts">
import { ref, getCurrentInstance, computed, watch, onMounted } from 'vue';
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
  disclosureZIndexOverride?: number;
}

enum SortButtonDirection {
  ASC = 'asc',
  DESC = 'desc',
}
type SortButtonEvents = {
  'change': [selected: string[]],
  'change-key': [key: string],
  'change-direction': [direction: string],
};

const props = defineProps<SortButtonProps>();
const emits = defineEmits<SortButtonEvents>();
const model = defineModel<string[]>();

onMounted(() => {
  model.value = props.selected;
});

watch(
  () => props.selected,
  (newVal) => {
    model.value = newVal;
  },
  { immediate: true },
);

const i18n = useI18n();
const currentInstance = getCurrentInstance();

const active = ref(false);
const selectedValue = computed(() => props.selected[0].split(' '));

const selectedValueKey = computed(() => selectedValue.value[0]);
const selectedDirection = computed(() => selectedValue.value[1]);

 const choiceListChoices = computed(() => {
    const choiceCategories = props.choices.reduce(
      (acc: ChoiceListProps['choices'], curr) => {
        const alreadyExists = acc.some((option) => option.label === curr.label);
        const [, currentValueDirection] = curr.value.split(' ');
        const isSameDirection = currentValueDirection === selectedDirection.value;
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
    return currentKey === selectedValueKey.value;
  });
});

function handleClick() {
  active.value = !active.value;
}

function handleClose() {
  active.value = false;
}

function handleChangeChoiceList(value: string[], _name: string) {
  if (currentInstance?.vnode.props?.onChangeKey) {
    const [key] = value[0].split(' ');
    emits('change-key', key);
  } else {
    emits('change', value);
  }3
}

function handleChangeDirection($el: string[]) {
  if (currentInstance?.vnode.props?.onChangeDirection) {
    const [, direction] = $el[0].split(' ');
    emits('change-direction', direction);
  } else {
    emits('change', $el);
  }
}
</script>
