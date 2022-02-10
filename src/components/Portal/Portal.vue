<template lang="pug">
MountingPortal(
  v-if="this.portalManager",
  mountTo="#PolarisPortalsContainer",
  :append="true",
  :name="portalId",
)
  div(:data-portal-id="portalId")
    slot
</template>

<script lang="ts">
import {
  Component, Prop, Inject, Mixins,
} from 'vue-property-decorator';
import { UseUniqueId } from '@/mixins';
import { MountingPortal } from 'portal-vue';
import { PortalManager } from '@/utilities/portal-manager';

@Component({
  components: {
    MountingPortal,
  },
})
export default class Portal extends Mixins(UseUniqueId) {
  @Inject({ default: null }) portalManager!: PortalManager;

  @Prop({ type: String }) public idPrefix!: string;

  private portalId = '';

  created() {
    const uniqueId = this.useUniqueId('portal');
    this.portalId = this.idPrefix ? `${this.idPrefix}-${uniqueId}` : uniqueId;
    if (this.portalManager) {
      this.portalManager.register(this.portalId);
    }
  }
}
</script>
