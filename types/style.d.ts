// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';

declare module 'vue/types/vue' {
  // eslint-disable-next-line no-shadow
  interface Vue {
    $style: Record<string, string>;
  }
}
