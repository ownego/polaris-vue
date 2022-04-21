declare module '*.vue' {
  import { defineComponent } from 'vue';
  import type { CustomProperties } from 'vue';

  const Component: ReturnType<typeof defineComponent>;

  interface CSSProperties {
    [k: string]: string;
    [k: `--${string}`]: string | number;
  }

  export default Component;
}
