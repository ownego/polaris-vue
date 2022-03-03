<template lang="pug">
li(
  v-bind="sectionAttributes",
  :id="domId",
  :class="className",
  ref="listItemRef",
  :role="legacyRoleSupport",
  :data-within-section="isWithinSection",
  :data-listbox-option-value="value",
  :data-listbox-option-destructive="mappedActionContext.destructive",
  :aria-disabled="disabled",
  :aria-label="accessibilityLabel",
  :aria-selected="selected",
  @click="handleOptionClick",
  @mousedown="handleMouseDown",
  tabindex="-1",
  data-listbox-option,
)
  UnstyledLink(
    v-if="mappedActionContext.url",
    :url="mappedActionContext.url",
    :external="mappedActionContext.external",
  )
    TextOption(
      v-if="!isSlotContainHTMLTag",
      :selected="selected",
      :disabled="disabled",
    )
      slot
    slot(v-else)
  template(v-else)
    TextOption(
      v-if="!isSlotContainHTMLTag",
      :selected="selected",
      :disabled="disabled",
    )
      slot
    slot(v-else)
</template>

<script setup lang="ts">
import { inject, ref, computed, useSlots } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import {
  listboxWithinSectionDataSelector,
} from 'polaris-react/src/components/Listbox/components/Section/selectors';
import type { ListboxContextType, NavigableOption } from '@/utilities/interface';
import type { MappedActionContextType } from '@/utilities/autocomplete';
import { UseUniqueId } from '@/use';
import styles from '@/classes/Listbox-Option.json';
import type { OptionProps } from './utils';
import { TextOption } from '../TextOption';
import { UnstyledLink } from '../../../UnstyledLink';

const mappedActionContext = inject<MappedActionContextType>('mappedActionContext', {});
const sectionContext = inject<string>('sectionContext', '');
const listboxContext = inject<ListboxContextType>('listboxContext', {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onOptionSelect(option: NavigableOption) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading(label?: string) {},
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LocalProps extends OptionProps {}

const props = defineProps<LocalProps>();

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const listItemRef = ref<HTMLLIElement | null>(null);

const { useUniqueId } = UseUniqueId();
const domId = useUniqueId('ListboxOption');

const isWithinSection = Boolean(sectionContext);
const isSlotContainHTMLTag = Boolean(
  defaultSlot.value
  && ( defaultSlot.value.length >= 2
    || defaultSlot.value[0].el?.nodeType !== 3),
);

const className = classNames(styles.Option, props.divider && styles.divider);

const sectionAttributes = {
  [listboxWithinSectionDataSelector.attribute]: isWithinSection,
};

const legacyRoleSupport = mappedActionContext.role || 'option';

const handleOptionClick = (event: MouseEvent) => {
  event.preventDefault();

  if (props.disabled) {
    return;
  }

  if (mappedActionContext.onAction) {
    mappedActionContext.onAction();
  }

  if (listItemRef.value && mappedActionContext.onAction) {
    const params = {
      domId,
      value: props.value,
      element: listItemRef.value,
      disabled: props.disabled || false,
    };

    listboxContext.onOptionSelect(params);
  }
}

const handleMouseDown = (event: MouseEvent): void => {
  event.preventDefault();
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Option/Option.scss';
</style>
