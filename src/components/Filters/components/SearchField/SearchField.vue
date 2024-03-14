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
  :auto-size="Boolean(showSuffix)",
  :loading="loading",
  @change="(eventValue) => handleChange(eventValue ?? model)",
  @clear-button-click="handleClear",
  @focus="emits('focus')",
  @blur="emits('blur')",
)
  template(
    v-if="breakpoints.mdUp",
    #prefix,
  )
    Icon(:source="SearchIcon")
  template(
    v-if="showSuffix",
    #suffix,
  )
    Text(
      as="span",
      variant="bodyMd",
      tone="subdued",
    ) {{ i18n.translate('Polaris.Filters.searchInView', { viewName: selectedViewName || '' }) }}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Text,
  Icon,
  TextField,
} from '@/components';
import { useBreakpoints } from '@/use/useBreakpoints';
import useId from '@/use/useId';
import useI18n from '@/use/useI18n';
import SearchIcon from '@icons/SearchIcon.svg';

interface SearchFieldProps {
  focused?: boolean;
  placeholder?: string;
  disabled?: boolean;
  borderlessQueryField?: boolean;
  /** Show a loading spinner to the right of the input */
  loading?: boolean;
  /** @deprecated If present, will show as a suffix in the text field when entering a search term */
  selectedViewName?: string;
}

type SearchFieldEvents = {
  'change': [string];
  'clear': [];
  'focus': [];
  'blur': [];
};

const props = defineProps<SearchFieldProps>();
const emits = defineEmits<SearchFieldEvents>();

const model = defineModel<string>();

const i18n = useI18n();
const id = useId();
const breakpoints = useBreakpoints();

const showSuffix = computed(() => {
  return model.value && props.selectedViewName && breakpoints.value.mdUp;
})

function handleChange(value:string) {
  emits('change', value);
}

function handleClear() {
  emits('clear');
  emits('change', '');
}
</script>
