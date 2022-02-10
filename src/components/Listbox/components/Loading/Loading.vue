<template lang="pug">
li(:class="listIemClassName", role="presentation")
  slot(v-if="$slots.default")
  div(v-else, :class="loadingClassName")
    Spinner(
      size="small",
      :accessibilityLabel="accessibilityLabel",
    )
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Inject,
  Watch,
} from 'vue-property-decorator';
import { ListboxContextType } from 'polaris-react/src/utilities/listbox';
import styles from '@/classes/Listbox-Loading.json';
import { Spinner } from '../../../Spinner';

@Component({
  components: {
    Spinner,
  },
})
export default class Loading extends Vue {
  @Inject({ default: {} }) listboxContext!: ListboxContextType;

  @Prop({ type: String, required: true })
  public accessibilityLabel!: string;

  public listIemClassName: string = styles.ListItem;

  public loadingClassName: string = styles.Loading;

  @Watch('accessibilityLabel')
  onAccessibilityLabelChanged() {
    if (this.listboxContext.setLoading) {
      this.listboxContext.setLoading(this.accessibilityLabel);

      return () => {
        this.listboxContext.setLoading(undefined);
      };
    }
  }

  protected mounted(): void {
    if (Object.keys(this.listboxContext).length === 0) {
      throw new Error('No Listbox was provided. Listbox components must be wrapped in a Listbox');
    }
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Loading/Loading.scss';
</style>
