<template lang="pug">
div(
  :class="className",
  @focus="handleFocus",
  @blur="handleBlur",
)
  VisuallyHidden
    label(:for="searchId") {{ lang.Polaris.TopBar.SearchField.search }}
  input(
    :id="searchId",
    :class="styles.Input",
    :placeholder="placeholder",
    ref="inputRef",
    type="search",
    autoCapitalize="off",
    autoComplete="off",
    autoCorrect="off",
    v-model="modelValue",
    @input="handleChange",
    @keydown.enter.prevent="() => false",
  )
  span(:class="styles.Icon")
    Icon(:source="SearchMinor")
  button(
    v-if="modelValue.length > 0",
    type="button",
    :aria-label="lang.Polaris.TopBar.SearchField.clearButtonLabel",
    :class="styles.Clear",
    @click="handleClear",
    @blur="onClearBlur",
    @focus="onClearFocus",
  )
    Icon(:source="CircleCancelMinor")
  div(:class="backDropClassName")
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import SearchMinor from '@icons/SearchMinor.svg';
import CircleCancelMinor from '@icons/CircleCancelMinor.svg';
import { VisuallyHidden, Icon } from '@/components';
import styles from '@/classes/TopBar-SearchField.json';
import { UseUniqueId } from '@/use';

interface SearchFieldProps {
  /** Initial value for the input */
  modelValue: string;
  /** Hint text to display */
  placeholder?: string;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Force a state where search is active but the text field component is not focused */
  active?: boolean;
  /** Show a border when the search field is focused */
  showFocusBorder?: boolean;
}

const props = defineProps<SearchFieldProps>();

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'cancel'): void;
  (e: 'update:modelValue', value: string): void
}>();

const lang = inject('lang') as Record<string, any>;

const forceActive = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const { useUniqueId } = UseUniqueId();
const searchId = useUniqueId('SearchField');

const handleChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  emits('change', el.value);
  emits('update:modelValue', el.value);
};

const handleFocus = () => {
  emits('focus');
};

const handleBlur = () => {
  emits('blur');
};

const handleClear = () => {
  emits('cancel');
  emits('update:modelValue', '');
  emits('change', '');

  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const onClearBlur = () => {
  forceActive.value = false;
};

const onClearFocus = () => {
  handleFocus();
  forceActive.value = true;
}

const className = computed(() => {
  return classNames(
    styles.SearchField,
    (props.focused || props.active || forceActive.value) && styles.focused,
  );
});

const backDropClassName = computed(() => {
  return classNames(
    styles.Backdrop,
    props.showFocusBorder && styles.BackdropShowFocusBorder,
  );
});

onMounted(() => {
  if (!inputRef.value) {
    return;
  }

  if (props.focused) {
    inputRef.value.focus();
  } else {
    inputRef.value.blur();
  }
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/TopBar/components/SearchField/SearchField.scss';
</style>
