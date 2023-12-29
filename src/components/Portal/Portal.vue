<template lang="pug">
teleport(
  v-if="container",
  :to="PORTAL_CONTAINER_ID",
)
  div(:data-portal-id="portalId")
    slot
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
} from 'vue';
import useId from '@/use/useId';
import usePortalsManager from '@/use/usePortalsManager';

const PORTAL_CONTAINER_ID = '#PolarisPortalsContainer';

export type PortalProps = {
  idPrefix?: string;
}

type PortalEmits = {
  'portal-created': [];
}

const props = defineProps<PortalProps>();

const emits = defineEmits<PortalEmits>();

// This variable to make sure that Portal is within AppProvider
const container = usePortalsManager();
const uniqueId = useId();

const portalId =  computed(() => {
  return props.idPrefix
    ? `${props.idPrefix}-${uniqueId}`
    : uniqueId;
});

onMounted(() => {
  emits('portal-created');
});
</script>
