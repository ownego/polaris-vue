<template lang="pug">
div(
  ref="secondaryActionsRef",
  :class="classNames(styles.SecondaryAction, tone === 'critical' && styles.critical)",
)
  Tooltip(
    v-if="props.helpText || hasSlot(slots.helpText)",
    preferredPosition="below"
    :content="helpText || ''",
  )
    template(
      v-if="hasSlot(slots.helpText)",
      #content,
    )
      slot(name="helpText")
    Button(
      v-bine="props",
      @click="emits('click')",
      :tone="destructive ? 'critical' : undefined",
    )
      slot
  Button(
    v-else,
    v-bine="props",
    :tone="destructive ? 'critical' : undefined",
    @click="emits('click')",
  )
    slot
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { classNames } from '@/utilities/css';
import { useHasSlot } from '@/use/useHasSlot';
import type { VueNode } from '@/utilities/types';
import type { ButtonProps } from '@/components/Button/types';
import styles from '@polaris/components/ActionMenu/components/SecondaryAction/SecondaryAction.module.scss';

interface SecondaryAction extends ButtonProps {
  helpText?: string;
  destructive?: boolean;
}

const slots = defineSlots<{
  default: (_?: VueNode) => any;
  helpText?: (_?: VueNode) => any;
}>();

const props = defineProps<SecondaryAction>();

// const emits = defineEmits<{
//   (e: 'click'): void;
//   (e: 'get-offset-width', width: number): void;
// }>();

const emits = defineEmits<{
  'click': [];
  'get-offset-width': [width: number];
}>();

const { hasSlot } = useHasSlot();

const secondaryActionsRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // onGetOffsetWidth(secondaryActionsRef.value?.offsetWidth || 0);
  if (secondaryActionsRef.value) {
    emits('get-offset-width', secondaryActionsRef.value?.offsetWidth || 0);
  }
})

// const onGetOffsetWidth = (width: number) => {
//   if (secondaryActionsRef.value) {
//     emits('get-offset-width', width);
//   }
// };

</script>
