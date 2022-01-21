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
import styles from '@/classes/Loading.json';
import { Spinner } from '../../../Spinner';

@Component({
  components: {
    Spinner,
  },
})
export default class Loading extends Vue {
  @Inject({ default: Function }) setLoading!: (label?: string) => void;

  @Prop({ type: String, required: true })
  public accessibilityLabel!: string;

  public listIemClassName: string = styles.ListItem;

  public loadingClassName: string = styles.Loading;

  @Watch('accessibilityLabel')
  onAccessibilityLabelChanged(): void {
    this.handleAccessibilityLabelChanged();
  }

  public handleAccessibilityLabelChanged() {
    this.setLoading(this.accessibilityLabel);
    return () => {
      this.setLoading(undefined);
    };
  }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Loading/Loading.scss';
</style>
