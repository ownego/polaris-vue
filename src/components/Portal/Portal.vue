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
  @Inject({ default: null }) public portalManager!: PortalManager;

  @Prop({ type: String }) public idPrefix!: string;

  private uniqueId = this.useUniqueId('portal');

  private portalId = this.idPrefix ? `${this.idPrefix}-${this.uniqueId}` : this.uniqueId;

  created() {
    if (this.portalManager) {
      this.portalManager.register(this.portalId);
    }
  }
}
</script>
