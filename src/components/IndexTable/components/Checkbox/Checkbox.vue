<template lang="pug">
td(v-if="!condensed", :class="checkboxClassName", ref="checkboxNode")
  div(:class="styles.TableCellContentContainer")
    div(
      :class="wrapperClassName",
      @click="rowContext.onInteraction",
    )
      Checkbox(
        :id="rowContext.itemId",
        :label="selectItemLabel",
        labelHidden,
        :checked="rowContext.selected",
      )
div(v-else, :class="styles.TableCellContentContainer")
  div(
    :class="wrapperClassName",
    @click="rowContext.onInteraction",
  )
    Checkbox(
      :id="rowContext.itemId",
      :label="selectItemLabel",
      labelHidden,
      :checked="rowContext.selected",
    )
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { setRootProperty } from 'polaris/polaris-react/src/utilities/set-root-property';
import { UseI18n } from '@/use';
import { useIndexValue } from '@/utilities/index-provider';
import { useRowContext } from '@/utilities/index-table';
import { Checkbox } from '@/components';
import styles from '@/classes/IndexTable-Checkbox.json';
import sharedStyles from '@/classes/IndexTable.json';

const i18n = UseI18n();

const { condensed, resourceName } = useIndexValue();
const rowContext = useRowContext();

const wrapperClassName = computed(() => classNames(
  styles.Wrapper,
  condensed?.value ? styles.condensed : styles.expanded,
));

// eslint-disable-next-line no-undef
const checkboxNode = ref<HTMLTableDataCellElement | null>(null);

const handleResize = () => {
  if (!checkboxNode.value) {
    return;
  }

  const {width} = checkboxNode.value.getBoundingClientRect();
  setRootProperty('--pc-checkbox-offset', `${width}px`);
};

const checkboxClassName = computed(() => classNames(
  sharedStyles.TableCell,
  sharedStyles['TableCell-first'],
));

const selectItemLabel = computed(() => {
  return i18n.translate('Polaris.IndexTable.selectItem', {
    resourceName: resourceName.singular,
  });
});

onMounted(() => {
  handleResize();

  if (!checkboxNode.value) {
    return;
  }
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/IndexTable/components/Checkbox/Checkbox.scss';
</style>
