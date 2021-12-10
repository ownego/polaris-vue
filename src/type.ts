import { VueConstructor } from 'vue';

export type IconSource =
  | VueConstructor<Vue>
  | 'placeholder'
  | string;
