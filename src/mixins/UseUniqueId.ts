import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { UniqueIdFactory } from 'polaris-react/src/utilities/unique-id/unique-id-factory';
import { MissingAppProviderError } from '@/utilities/errors';

@Component
export default class UseUniqueId extends Vue {
  @Inject('uniqueIdFactory') idFactory!: UniqueIdFactory;

  public uniqueIdRef: string | null = null;

  public useUniqueId(prefix = '', overrideId = '') {
    if (!this.idFactory) {
      throw new MissingAppProviderError('No UniqueIdFactory was provided.');
    }

    if (overrideId) {
      return overrideId;
    }

    // If a unique id has not yet been generated, then get a new one
    if (!this.uniqueIdRef) {
      this.uniqueIdRef = this.idFactory.nextId(prefix);
    }

    return this.uniqueIdRef;
  }
}
