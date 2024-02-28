<template lang="pug">
td(
  ref="checkboxNode",
  :class="checkboxClassName",
)
  div(:class="styles.TableCellContentContainer")
    div(
      :class="wrapperClassName",
      @click="onInteraction",
      @keyup="() => {}",
    )
      PolarisCheckbox(
        :id="`Select-${itemId}`",
        label-hidden,
        :checked="selected",
        :disabled="disabled",
      )
        template(#label) {{ label }}
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { debounce } from '@polaris/utilities/debounce';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { useIndexContext } from '@/components/IndexProvider/context';
import { Checkbox as PolarisCheckbox } from '@/components';
import { setRootProperty } from '@polaris/utilities/set-root-property';
import { useRowContext } from '../../context';

import sharedStyles from '@polaris/components/IndexTable/IndexTable.module.scss';
import styles from '@polaris/components/IndexTable/components/Checkbox/Checkbox.module.scss';

type CheckboxProps = {
  accessibilityLabel?: string;
}

const props = defineProps<CheckboxProps>();

const i18n = useI18n();

const indexContext = useIndexContext();
const { resourceName } = indexContext;

const { itemId, selected, disabled, position, onInteraction } = useRowContext();

const checkboxNode = ref<HTMLTableDataCellElement | null>(null);

const wrapperClassName = classNames(styles.Wrapper);

const label = computed(() => (
  props.accessibilityLabel || i18n.translate('Polaris.IndexTable.selectItem', {
    resourceName: resourceName?.singular,
  })
));

const checkboxClassName = classNames(
  sharedStyles.TableCell,
  sharedStyles['TableCell-first'],
)

const handleResize = debounce(() => {
  if (position?.value !== 0 || !checkboxNode.value) return;

  const {width} = checkboxNode.value.getBoundingClientRect();
  setRootProperty('--pc-checkbox-offset', `${width}px`);
});

onMounted(() => {
  handleResize();

  if (!checkboxNode.value) return;

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
