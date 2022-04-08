<template lang="pug">
li(
  :key="id",
  :class="styles.Option",
  tabIndex="-1"
)
  ScrollTo(v-if="active")
  template(v-if="allowMultiple")
    label(
      :for="id",
      :class="multiSelectClassName"
    )
      div(:class="styles.Checkbox")
        Checkbox(
          :id="id",
          v-model="value",
          :checked="select",
          :active="active"
          :disabled="disabled",
          :role="checkBoxRole",
          @change="handleClick",
        )
      div(v-if="slots.media", :class="styles.Media")
        slot(name="media")
      slot(name="label")
  template(v-else)
    button(
      type="button",
      :id="id",
      :class="singleSelectClassName",
      :disabled="disabled",
      :aria-pressed="active",
      @click="handleClick",
      @focus="toggleFocused",
      @blur="toggleFocused",
    )
      div(v-if="slots.media", :class="styles.Media")
        slot(name="media")
      slot(name="label")
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { classNames, variationName } from 'polaris/polaris-react/src/utilities/css';
import { ScrollTo } from '@/components';
import styles from '@/classes/OptionList-Option.json';
import { Checkbox } from '../Checkbox';

type Alignment = 'top' | 'center' | 'bottom';

interface OptionProps {
  id: string;
  value: string;
  section: number;
  index: number;
  disabled?: boolean;
  active?: boolean;
  select?: boolean;
  allowMultiple?: boolean;
  verticalAlign?: Alignment;
  role?: string;
}

const props = defineProps<OptionProps>();

const slots = useSlots();

const emits = defineEmits<{
  (e: 'click', section: number, index: number): void;
}>();

const focused = ref(false);

const toggleFocused = () => {
  focused.value = !focused.value;
}

const singleSelectClassName = computed(() => {
  return classNames(
    styles.SingleSelectOption,
    focused.value && styles.focused,
    props.disabled && styles.disabled,
    props.select && styles.select,
    props.active && styles.active,
    props.verticalAlign && styles[variationName('verticalAlign', props.verticalAlign)],
  );
});

const multiSelectClassName = computed(() => {
  return classNames(
    styles.Label,
    props.disabled && styles.disabled,
    props.active && styles.active,
    props.select && styles.select,
    props.verticalAlign && styles[variationName('verticalAlign', props.verticalAlign)],
  );
});

const checkBoxRole = computed(() => props.role === 'option' ? 'presentation' : undefined);

const handleClick = () => {
  if (props.disabled) {
    return;
  }

  emits('click', props.section, props.index);
};
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/OptionList/components/Option/Option.scss';
</style>

