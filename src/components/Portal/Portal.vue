<template lang="pug">
MountingPortal(
  v-if="this.portalManager",
  mountTo="#PolarisPortalsContainer",
  :append="true",
  :name="portalId",
)
  slot
div(v-else)
  PortalVue(:to="portalId")
    slot
  PortalTarget(:name="portalId")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Inject } from 'vue-property-decorator';
import { Portal as PortalVue, PortalTarget, MountingPortal } from 'portal-vue';
import { PortalManager } from '@/utilities/portal-manager';

@Component({
  components: {
    MountingPortal,
    PortalVue,
    PortalTarget,
  },
})
export default class Portal extends Vue {
  @Inject({ default: null }) public portalManager!: PortalManager;

  @Prop({ type: String }) public portalId!: string;

  created() {
    if (this.portalManager) {
      this.portalManager.register(this.portalId);
    }
  }
}
</script>
