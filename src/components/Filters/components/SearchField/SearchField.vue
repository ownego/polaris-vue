<template lang="pug">
TextField(
  :id="String(id)",
  v-model="model",
  label-hidden,
  clear-button,
  size="slim",
  auto-complete="off",
  :placeholder="placeholder",
  :disabled="disabled",
  :variant="borderlessQueryField ? 'borderless' : 'inherit'",
  :focused="focused",
  :label="placeholder",
  @change="(eventValue) => handleChange(eventValue ?? model)",
  @clear-button-click="handleClear",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(
    v-if="breakpoints.mdUp",
    #prefix
  )
    Icon(:source="SearchIcon")
  template(
    v-if="loading",
    #suffix
  )
    div(:class="styles.Spinner")
      Spinner(size="small")
</template>

<script setup lang="ts">
import {
  Spinner,
  Icon,
  TextField,
} from '@/components';
import { useBreakpoints } from '@/utilities/breakpoints';
import useId from '@/use/useId';
import styles from '@polaris/components/Filters/components/SearchField/SearchField.module.scss';
import SearchIcon from '@icons/SearchIcon.svg';

interface SearchFieldProps {
  focused?: boolean;
  placeholder?: string;
  disabled?: boolean;
  borderlessQueryField?: boolean;
  /** Show a loading spinner to the right of the input */
  loading?: boolean;
}

type SearchFieldEvents = {
  'change': [string];
  'clear': [];
  'focus': [];
  'blur': [];
};

defineProps<SearchFieldProps>();
const emits = defineEmits<SearchFieldEvents>();

const model = defineModel<string>();

const id = useId();
const breakpoints = useBreakpoints();

function handleChange(value:string) {
  emits('change', value);
}

function handleClear() {
  emits('clear');
  emits('change', '');
}
</script>
