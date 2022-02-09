import {
  Component, Mixins, Inject, Prop, Watch,
} from 'vue-property-decorator';
import { MissingAppProviderError } from '@/utilities/errors';
import { FocusManager } from '@/utilities/focus-manager';
import UseUniqueId from './UseUniqueId';

@Component
export default class UseFocusManager extends Mixins(UseUniqueId) {
  @Inject() focusManager!: FocusManager;

  @Prop({ type: Boolean, default: true }) public trapping!: boolean;

  @Watch('trapping')
  @Watch('uniqueIdRef')
  trapFocus() {
    if (this.trapping && this.uniqueIdRef) {
      this.focusManager.add(this.uniqueIdRef);
    }
  }

  created() {
    if (!this.focusManager) {
      throw new MissingAppProviderError('No FocusManager was provided.');
    }
  }

  mounted() {
    const id = this.useUniqueId();

    if (this.trapping) {
      this.focusManager.add(id);
    }
  }

  beforeDestroy() {
    if (this.uniqueIdRef) this.focusManager.remove(this.uniqueIdRef);
  }

  get canSafelyFocus() {
    return this.focusManager.trapFocusList[0] === this.uniqueIdRef;
  }
}
