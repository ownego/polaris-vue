<template lang="pug">
teleport(
  v-if="portalManager",
  to="#PolarisPortalsContainer",
)
  div(:data-portal-id="portalId")
    slot
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { UseUniqueId } from '@/use';
import { PortalManager } from '@/utilities/portal-manager';

const props = defineProps({
  idPrefix: {
    type: String,
    default: '',
  },
});

const portalManager = inject('portalManager', new PortalManager());

const portalId = ref<string>('');

const { useUniqueId } = UseUniqueId();

onMounted(() => {
  const uniqueId = useUniqueId('portal');
  portalId.value = props.idPrefix ? `${props.idPrefix}-${uniqueId}` : (uniqueId as string);

  if (portalManager) {
    portalManager.register(portalId.value);
  }
});
</script>
