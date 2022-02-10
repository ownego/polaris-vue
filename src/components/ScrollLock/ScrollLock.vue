<script lang="ts">
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { ScrollLockManager } from 'polaris-react/src/utilities/scroll-lock-manager/scroll-lock-manager';

@Component
export default class ScrollLock extends Vue {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

  @Inject({ default: new ScrollLockManager() }) scrollLockManager !: ScrollLockManager;

  created(): void {
    this.scrollLockManager.registerScrollLock();
  }

  beforeDestroy(): void {
    this.scrollLockManager.unregisterScrollLock();
  }
}

</script>
<style lang="scss">
@import 'polaris-react/src/components/ScrollLock/ScrollLock.scss';
</style>
