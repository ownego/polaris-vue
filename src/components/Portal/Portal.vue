<template lang="pug">
teleport(
  v-if="portalManager",
  to="#PolarisPortalsContainer",
)
  div(:data-portal-id="portalId")
    slot
</template>

<script lang="ts">
import {
  defineComponent, ref, inject, onMounted,
} from 'vue';
import { UseUniqueId } from '@/use';
import { PortalManager } from '@/utilities/portal-manager';

export default defineComponent({
  props: {
    idPrefix: {
      type: String,
    },
  },
  setup(props) {
    const portalManager = inject('portalManager') as PortalManager;
    const portalId = ref<string>('');
    const { useUniqueId } = UseUniqueId();

    onMounted(() => {
      const uniqueId = useUniqueId('portal');
      portalId.value = props.idPrefix ? `${props.idPrefix}-${uniqueId}` : uniqueId as string;

      if (portalManager) {
        portalManager.register(portalId.value);
      }
    });

    return { portalId, portalManager };
  },
});
</script>
