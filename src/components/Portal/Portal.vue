<template lang="pug">
teleport(
  v-if="container",
  to="container",
)
  div(:data-portal-id="portalId")
    slot
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useId from '@/use/useId';
import usePortalsManager from '@/use/usePortalsManager';

export type PortalProps = {
  idPrefix?: string;
}

interface PortalEmits {
  (event: 'portal-created'): void;
}


const props = defineProps<PortalProps>();

const emits = defineEmits<PortalEmits>();

const { container } = usePortalsManager();
const uniqueId = useId();

const portalId =  computed(() => {
  return props.idPrefix
    ? `${props.idPrefix}-${uniqueId}`
    : uniqueId;
})
</script>
