<template lang="pug">
div(:class="className")
  input(
    type="checkbox"
    :id="uniqueId",
    :name="name",
    :value="modelValue",
    :checked="checked"
    :disabled="disabled",
    :class="inputClassName",
    :aria-checked="checked",
    @change="handleChange",
    @blur="handleBlur",
    @keyup="handleKeyUp",
    :role="role",
  )
  div(:class="styles.Backdrop")
  div(:class="styles.Icon")
    Icon(:source="TickSmallMinor")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import styles from '@/classes/OptionList-Checkbox.json';
import TickSmallMinor from '@icons/TickSmallMinor.svg';
import { UseUniqueId } from '@/use';
import { Icon } from '@/components';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  active?: boolean;
  id?: string;
  name?: string;
  modelValue?: string;
  role?: string;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: false,
});

const emits = defineEmits<{
  (event: 'change', value: string): void
  (event: 'update:modelValue', value: string): void
}>();

const { useUniqueId } = UseUniqueId();
const uniqueId = useUniqueId('Checkbox', props.id);

const keyFocused = ref<boolean>(false);

const className = computed(() => classNames(styles.Checkbox, props.active && styles.active));

const inputClassName = computed(() => {
  return classNames(
    styles.Input,
    keyFocused.value && styles.keyFocused,
  );
});

const handleBlur = () => {
  keyFocused.value = false;
};

const handleKeyUp = () => {
  if (!keyFocused.value) {
    keyFocused.value = true;
  }
};

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  emits('update:modelValue', target.value);
  emits('change', target.value);
}
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/OptionList/components/Checkbox/Checkbox.scss';
</style>

