<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'vue-property-decorator';
import { isServer } from 'polaris-react/src/utilities/target';

export const SCROLL_LOCKING_ATTRIBUTE = 'data-lock-scrolling';

const SCROLL_LOCKING_WRAPPER_ATTRIBUTE = 'data-lock-scrolling-wrapper';

let scrollPosition = 0;

@Component
export default class ScrollLock extends Vue {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }

  @Provide() scrollLocks = 0;

  @Provide() locked = false;

  registerScrollLock() {
    this.scrollLocks += 1;
    this.handleScrollLocking();
  }

  unregisterScrollLock() {
    this.scrollLocks -= 1;
    this.handleScrollLocking();
  }

  handleScrollLocking() {
    if (isServer) return;

    const { scrollLocks } = this;
    const { body } = document;
    const wrapper = body.firstElementChild;

    if (scrollLocks === 0) {
      body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, '');

      if (wrapper) {
        wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, '');
        wrapper.scrollTop = scrollPosition;
      }
      this.locked = true;
    }
  }

  created(): void {
    console.log('register', this.scrollLocks);
    this.registerScrollLock();
  }

  beforeDestroy(): void {
    this.unregisterScrollLock();
  }
}

</script>
<style lang="scss">
@import 'polaris-react/src/components/ScrollLock/ScrollLock.scss';
</style>
