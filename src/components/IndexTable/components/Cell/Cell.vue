<template lang="pug">
component(
  :is="as",
  :id="id",
  :class="customClassName",
  :colspan="colSpan",
  :scope="scope",
  :headers="headers",
)
  slot
</template>

<script setup lang="ts">
import { type VNode, computed } from 'vue';
import { classNames } from '@/utilities/css';
import type { VueNode } from '@/utilities/types';
import styles from '@polaris/components/IndexTable/IndexTable.module.scss';

export type CellProps = {
  /** The table cell element to render. Render the cell as a `th` if it serves as a subheading
   * @default 'td'
   */
  as?: 'th' | 'td';
  /** The unique ID to set on the cell element */
  id?: string;
  /** Custom class name to apply to the cell element */
  className?: string;
  /** Whether the cell padding should be removed
   * @default false
   */
  flush?: boolean;
  /** For subheader cells -- The number of the columns that the cell element should extend to */
  colSpan?: HTMLTableCellElement['colSpan'];
  /**  For subheader cells -- Indicates the cells that the `th` element relates to */
  scope?: HTMLTableCellElement['scope'];
  /** A space-separated list of the `th` cell IDs that describe or apply to it. Use for cells within a row that relate to a subheader cell in addition to their column header. */
  headers?: HTMLTableCellElement['headers'];
}

type CellSlots = {
  default: (_: VueNode) => VNode[];
}

const props = withDefaults(defineProps<CellProps>(), {
  as: 'td',
});
const slots = defineSlots<CellSlots>();

const customClassName = computed(() => classNames(
  props.className,
  styles.TableCell,
  props.flush && styles['TableCell-flush'],
));
</script>
